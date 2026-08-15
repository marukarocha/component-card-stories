import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Pause,
  Play,
  Share2,
  Video,
  X,
} from 'lucide-react'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/effect-creative'

export type StoryKind = 'image' | 'video' | 'data' | 'ad' | 'poll' | 'share'

export type StoryMetric = {
  label: string
  value: number
  delta?: number
}

type StoryBase = {
  id: string
  kind: StoryKind
  title: string
  description: string
  eyebrow?: string
  durationMs?: number
}

export type ImageStory = StoryBase & {
  kind: 'image'
  image: string
}

export type VideoStory = StoryBase & {
  kind: 'video'
  videoSrc: string
  poster?: string
}

export type DataStory = StoryBase & {
  kind: 'data'
  metrics: StoryMetric[]
  summary: string
}

export type AdStory = StoryBase & {
  kind: 'ad'
  brand: string
  ctaLabel: string
  sponsor: string
}

export type PollStory = StoryBase & {
  kind: 'poll'
  question: string
  options: Array<{
    id: string
    label: string
    votes: number
  }>
}

export type ShareStory = StoryBase & {
  kind: 'share'
  shareText: string
}

export type StoryItem = ImageStory | VideoStory | DataStory | AdStory | PollStory | ShareStory

export type StoryGroup = {
  id: string
  slug: string
  title: string
  category: string
  subtitle: string
  accent: string
  cover: string
  shareLabel?: string
  shareText?: string
  stories: StoryItem[]
}

type CardStoriesProps = {
  groups: StoryGroup[]
  autoDuration?: number
  basePath?: string
  displayLimit?: number
  cardRadius?: 'square' | 'circle' | 'rounded' | 'pill'
}

type ShareCopyState = 'idle' | 'copied'

const StoryChart = lazy(() => import('./StoryChart').then((module) => ({ default: module.StoryChart })))

function slugPath(basePath: string, slug: string) {
  return `${basePath.replace(/\/$/, '')}/${slug}`
}

function normalizePath(pathname: string, basePath: string) {
  const cleanBase = basePath.replace(/\/$/, '')
  const parts = pathname.split('/').filter(Boolean)
  const baseParts = cleanBase.split('/').filter(Boolean)

  if (parts.length < baseParts.length + 1) return null
  if (baseParts.some((part, index) => parts[index] !== part)) return null

  return parts[baseParts.length] ?? null
}

function StoryMedia({
  story,
  accent,
}: {
  story: StoryItem
  accent: string
}) {
  if (story.kind === 'video') {
    return (
      <div className="story-media">
        <video
          className="story-video"
          src={story.videoSrc}
          poster={story.poster}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="story-media-overlay" />
        <div className="story-media-chip">
          <Video size={16} />
          Video story
        </div>
      </div>
    )
  }

  if (story.kind === 'data') {
    const dataStory = story
    return (
      <div className="story-media story-data-media">
        <div className="story-data-copy">
          <span className="story-data-kicker">Dados ao vivo</span>
          <h3>{dataStory.title}</h3>
          <p>{dataStory.summary}</p>
        </div>
        <Suspense
          fallback={<div className="story-chart-loading">Carregando gráfico...</div>}
        >
          <StoryChart metrics={dataStory.metrics} accent={accent} />
        </Suspense>
      </div>
    )
  }

  if (story.kind === 'ad') {
    const adStory = story
    return (
      <div className="story-media story-ad-media">
        <div className="story-ad-card">
          <span className="story-ad-label">{adStory.sponsor}</span>
          <h3>{adStory.title}</h3>
          <button type="button" className="story-action story-ad-cta">
            {adStory.ctaLabel}
          </button>
        </div>
        <div className="story-ad-visual" aria-hidden="true">
          <div />
          <div />
        </div>
      </div>
    )
  }

  if (story.kind === 'poll') {
    const pollStory = story
    function PollBody() {
      const [selectedOption, setSelectedOption] = useState<string | null>(null)

      return (
        <div className="story-media story-poll-media">
          <div className="story-poll-head">
            <span>Enquete</span>
            <h3>{pollStory.question}</h3>
          </div>
          <div className="story-poll-options">
            {pollStory.options.map((option) => {
              const isSelected = selectedOption === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`story-poll-option${isSelected ? ' is-selected' : ''}`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <strong>{option.label}</strong>
                  <span>{isSelected ? 'Votado' : `${option.votes}%`}</span>
                </button>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <PollBody />
    )
  }

  if (story.kind === 'share') {
    return null
  }

  return (
    <div className="story-media">
      <img src={story.image} alt="" />
      <div className="story-media-overlay" />
    </div>
  )
}

export function CardStories({
  groups,
  autoDuration = 5000,
  basePath = '/stories',
  displayLimit,
  cardRadius = 'rounded',
}: CardStoriesProps) {
  const [activeGroupSlug, setActiveGroupSlug] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [shareCopyState, setShareCopyState] = useState<ShareCopyState>('idle')
  const [isSwitchingGroup, setIsSwitchingGroup] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperInstance | null>(null)
  const timerRef = useRef<number | null>(null)
  const progressRef = useRef(0)
  const switchTimerRef = useRef<number | null>(null)

  const activeGroup = useMemo(
    () => groups.find((group) => group.slug === activeGroupSlug) ?? null,
    [groups, activeGroupSlug],
  )

  const previewGroups = useMemo(() => {
    if (typeof displayLimit !== 'number') return groups

    return groups.slice(0, Math.max(0, displayLimit))
  }, [groups, displayLimit])

  const activeSlides = useMemo(() => {
    if (!activeGroup) return []

    return [
      ...activeGroup.stories,
      {
        id: `${activeGroup.id}-share`,
        kind: 'share' as const,
        title:
          activeGroup.shareLabel ??
          'Gostou desse Conteudo? Compartilhe!',
        description:
          activeGroup.shareText ?? 'Compartilhe e volte para ver os cards.',
        durationMs: autoDuration,
        shareText: activeGroup.shareText ?? activeGroup.title,
      },
    ]
  }, [activeGroup, autoDuration])

  const activeSlide = activeSlides[activeIndex]
  const showNavControls =
    activeSlide?.kind !== 'share' && activeSlide?.kind !== 'ad' && !isSwitchingGroup

  const syncRoute = (slug: string | null, replace = false) => {
    const nextUrl = slug ? slugPath(basePath, slug) : '/'
    const method = replace ? 'replaceState' : 'pushState'
    window.history[method]({}, '', nextUrl)
  }

  const animateIntoView = () => {
    if (!phoneRef.current) return

    gsap.fromTo(
      phoneRef.current,
      { y: 18, opacity: 0.88, scale: 0.985 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' },
    )
  }

  const openStories = (slug: string, replace = false) => {
    setActiveGroupSlug(slug)
    setActiveIndex(0)
    setProgress(0)
    progressRef.current = 0
    setIsPaused(false)
    syncRoute(slug, replace)
  }

  const switchGroup = (group: StoryGroup, index: number, replace = false) => {
    if (isSwitchingGroup) return

    setIsSwitchingGroup(true)
    setIsPaused(true)

    if (switchTimerRef.current) {
      window.clearTimeout(switchTimerRef.current)
    }

    gsap.to(phoneRef.current, {
      y: -10,
      opacity: 0,
      scale: 0.98,
      duration: 0.22,
      ease: 'power2.inOut',
    })

    switchTimerRef.current = window.setTimeout(() => {
      setActiveGroupSlug(group.slug)
      setActiveIndex(index)
      setProgress(0)
      progressRef.current = 0
      syncRoute(group.slug, replace)

      window.requestAnimationFrame(() => {
        animateIntoView()
        setIsPaused(false)
        setIsSwitchingGroup(false)
      })
    }, 140)
  }

  const closeStories = () => {
    if (!overlayRef.current || !phoneRef.current) {
      setActiveGroupSlug(null)
      syncRoute(null)
      return
    }

    gsap.to(phoneRef.current, {
      y: 24,
      scale: 0.96,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.22,
      ease: 'power2.out',
      onComplete: () => {
        setActiveGroupSlug(null)
        syncRoute(null)
      },
    })
  }

  const goToGroup = (group: StoryGroup, index: number, replace = false) => {
    switchGroup(group, index, replace)
  }

  const goNext = () => {
    if (!activeGroup || !activeSlide) return

    if (activeIndex < activeSlides.length - 1) {
      swiperRef.current?.slideNext()
      return
    }

    const groupIndex = groups.findIndex((group) => group.slug === activeGroup.slug)
    const nextGroup = groups[groupIndex + 1]

    if (nextGroup) {
      goToGroup(nextGroup, 0)
      return
    }

    closeStories()
  }

  const goPrevious = () => {
    if (!activeGroup || !activeSlide) return

    if (activeIndex > 0) {
      swiperRef.current?.slidePrev()
      return
    }

    const groupIndex = groups.findIndex((group) => group.slug === activeGroup.slug)
    const previousGroup = groups[groupIndex - 1]

    if (previousGroup) {
      switchGroup(previousGroup, Math.max(previousGroup.stories.length - 1, 0), false)
    }
  }

  const copyShareLink = async () => {
    if (!activeGroup) return

    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareCopyState('copied')
      window.setTimeout(() => setShareCopyState('idle'), 1500)
    } catch {
      setShareCopyState('idle')
    }
  }

  const shareAndReturn = async () => {
    if (!activeGroup) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: activeGroup.title,
          text: activeGroup.shareText ?? activeGroup.title,
          url: window.location.href,
        })
      } catch {
        // ignore cancelled share flows
      }
    } else {
      await copyShareLink()
    }
  }

  useEffect(() => {
    const openFromLocation = () => {
      const slug = normalizePath(window.location.pathname, basePath)
      if (!slug) return

      const matchedGroup = groups.find((group) => group.slug === slug)
      if (matchedGroup) {
        setActiveGroupSlug(matchedGroup.slug)
        setActiveIndex(0)
        setProgress(0)
        progressRef.current = 0
      }
    }

    openFromLocation()
    window.addEventListener('popstate', openFromLocation)
    return () => window.removeEventListener('popstate', openFromLocation)
  }, [groups, basePath])

  useEffect(() => {
    if (!activeGroup || !overlayRef.current || !phoneRef.current) return

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.22, ease: 'power2.out' },
    )
    gsap.fromTo(
      phoneRef.current,
      { y: 24, scale: 0.985, opacity: 0.94 },
      { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' },
    )
  }, [activeGroup])

  useEffect(() => {
    if (!activeGroup || !swiperRef.current) return

    swiperRef.current.update()
    swiperRef.current.slideTo(activeIndex, 0)
  }, [activeGroupSlug, activeIndex, activeSlides.length])

  useEffect(() => {
    if (!activeGroup || !activeSlide) return

    const duration = activeSlide.durationMs ?? autoDuration
    const startedAt = performance.now() - (progressRef.current / 100) * duration

    if (timerRef.current) {
      window.cancelAnimationFrame(timerRef.current)
      timerRef.current = null
    }

    const tick = (now: number) => {
      const nextProgress = Math.min(((now - startedAt) / duration) * 100, 100)
      progressRef.current = nextProgress
      setProgress(nextProgress)

      if (nextProgress >= 100) {
        timerRef.current = null
        goNext()
        return
      }

      timerRef.current = window.requestAnimationFrame(tick)
    }

    if (!isPaused) {
      timerRef.current = window.requestAnimationFrame(tick)
    }

    return () => {
      if (timerRef.current) {
        window.cancelAnimationFrame(timerRef.current)
        timerRef.current = null
      }
    }
  }, [activeGroup, activeSlide, autoDuration, isPaused])

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) {
        window.clearTimeout(switchTimerRef.current)
        switchTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!activeGroup) return

      if (event.key === 'Escape') closeStories()
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrevious()
      if (event.key === ' ') {
        event.preventDefault()
        setIsPaused((paused) => !paused)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeGroup, activeIndex, activeSlide, activeSlides])

  return (
    <>
      <section className="story-grid" aria-label="Colecao de cards stories">
        {previewGroups.map((group) => (
          <button
            className={`story-card story-card-${cardRadius}`}
            key={group.id}
            type="button"
            onClick={() => openStories(group.slug)}
            style={
              {
                '--accent': group.accent,
                '--card-radius':
                  cardRadius === 'square'
                    ? '8px'
                    : cardRadius === 'circle'
                      ? '999px'
                    : cardRadius === 'pill'
                      ? '26px'
                      : '18px',
                '--card-aspect':
                  cardRadius === 'circle' || cardRadius === 'square'
                    ? '1 / 1'
                    : '4 / 5',
              } as CSSProperties
            }
          >
            <img src={group.cover} alt="" />
            <span>{group.category}</span>
            <strong>{group.title}</strong>
            <small>
              {group.stories.length} cards + final de compartilhamento
            </small>
          </button>
        ))}
      </section>

      {activeGroup && activeSlide ? (
        <div
          className="story-overlay"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Stories: ${activeGroup.title}`}
        >
          <div className="story-phone" ref={phoneRef}>
            <div className="story-progress">
              {activeSlides.map((story, index) => (
                <span key={story.id}>
                  <i
                    style={{
                      transform:
                        index < activeIndex
                          ? 'scaleX(1)'
                          : index === activeIndex
                            ? `scaleX(${progress / 100})`
                            : 'scaleX(0)',
                    }}
                  />
                </span>
              ))}
            </div>

            <header className="story-topbar">
              <div>
                <img src={activeGroup.cover} alt="" />
                <div>
                  <strong>{activeGroup.title}</strong>
                  <span>{activeGroup.category}</span>
                </div>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-label={isPaused ? 'Reproduzir stories' : 'Pausar stories'}
              >
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
              </button>
              <button
                className="icon-button"
                type="button"
                onClick={closeStories}
                aria-label="Fechar stories"
              >
                <X size={20} />
              </button>
            </header>

            <Swiper
              className="story-swiper"
              modules={[Keyboard, Mousewheel]}
              effect="slide"
              speed={420}
              observer
              observeParents
              observeSlideChildren
              keyboard
              mousewheel={{ forceToAxis: true, sensitivity: 0.8, releaseOnEdges: true }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                progressRef.current = 0
                setActiveIndex(swiper.activeIndex)
                setProgress(0)
                setIsPaused(false)
              }}
            >
              {activeSlides.map((story) => (
                <SwiperSlide key={story.id}>
                  <article
                    className="story-slide"
                    style={{ '--accent': activeGroup.accent } as CSSProperties}
                    onPointerDownCapture={() => setIsPaused(true)}
                  >
                    {story.kind === 'share' ? (
                      <div className="story-share">
                        <span className="story-share-tag">{activeGroup.category}</span>
                        <h2>Compartilhe</h2>
                        <div className="story-share-actions">
                          <button
                            type="button"
                            className="story-action"
                            onClick={() => void shareAndReturn()}
                          >
                            <Share2 size={16} />
                            Compartilhe
                          </button>
                          <button
                            type="button"
                            className="story-action story-action-ghost"
                            onClick={copyShareLink}
                          >
                            <Copy size={16} />
                            {shareCopyState === 'copied' ? 'Copiado' : 'Link'}
                          </button>
                        </div>
                        <div className="story-share-footer">
                          <button
                            type="button"
                            className="story-action story-action-ghost"
                            onClick={goNext}
                          >
                            <ArrowRight size={16} />
                            Proximo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <StoryMedia story={story} accent={activeGroup.accent} />
                        <div className="story-vignette" />
                        <div className="story-copy">
                          {story.eyebrow ? <span>{story.eyebrow}</span> : null}
                          <h2>{story.title}</h2>
                          <p>{story.description}</p>
                        </div>
                      </>
                    )}
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {showNavControls ? (
              <>
                <button
                  className="tap-zone tap-zone-left"
                  type="button"
                  onClick={goPrevious}
                  aria-label="Story anterior"
                />
                <button
                  className="tap-zone tap-zone-right"
                  type="button"
                  onClick={goNext}
                  aria-label="Proximo story"
                />

                <button
                  className="floating-nav floating-nav-left"
                  type="button"
                  onClick={goPrevious}
                  aria-label="Voltar"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="floating-nav floating-nav-right"
                  type="button"
                  onClick={goNext}
                  aria-label="Avancar"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
