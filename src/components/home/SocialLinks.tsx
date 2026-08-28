import { useEffect, useState } from 'react'
import { cn } from '~/lib/utils'
import type { SocialPreviewConfig, SocialPreviewVariant } from '~/types'

interface SocialItem {
  url: string
  icon: string
  label: string
  preview: SocialPreviewVariant
}

interface Props {
  socials: SocialItem[]
  previewConfig: SocialPreviewConfig
}

const CURSOR_OFFSET = 16

const SocialLinks: React.FC<Props> = ({ socials, previewConfig }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (hoveredIndex === null) return

    const handleMouseMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [hoveredIndex])

  const active = hoveredIndex === null ? null : socials[hoveredIndex]

  return (
    <div className="flex flex-wrap gap-2">
      {socials.map((item, index) => (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-muted-foreground no-underline transition-colors duration-200 hover:border-foreground/10 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className={cn('size-4 shrink-0 text-foreground/70 transition-colors duration-200 group-hover:text-foreground', item.icon)} />
          {item.label}
        </a>
      ))}

      {active && (
        <div
          className="pointer-events-none fixed z-50 w-72 max-w-[calc(100vw-2rem)]"
          style={{ left: cursor.x + CURSOR_OFFSET, top: cursor.y + CURSOR_OFFSET }}
        >
          <PreviewCard variant={active.preview} config={previewConfig} />
        </div>
      )}
    </div>
  )
}

const PreviewCard: React.FC<{ variant: SocialPreviewVariant; config: SocialPreviewConfig }> = ({ variant, config }) => {
  if (variant === 'x') {
    const x = config.x
    return (
      <div className="rounded-2xl border border-border bg-background p-4 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <img src={x.avatar} alt={x.name} width={48} height={48} className="size-12 shrink-0 rounded-full border border-border object-cover" />
          <button type="button" tabIndex={-1} className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background">
            Follow
          </button>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-1">
            <p className="truncate font-semibold text-foreground">{x.name}</p>
            {x.verified && <span className="icon-[ri--verified-badge-fill] size-4 shrink-0 text-blue-500" />}
          </div>
          <p className="text-sm text-muted-foreground">{x.handle}</p>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-foreground/90">{x.bio}</p>

        <div className="mt-3 flex items-center gap-4 text-sm">
          <p className="text-foreground">
            <span className="font-semibold">{x.following}</span> <span className="text-muted-foreground">Following</span>
          </p>
          <p className="text-foreground">
            <span className="font-semibold">{x.followers}</span> <span className="text-muted-foreground">Followers</span>
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'linkedin') {
    const linkedin = config.linkedin
    return (
      <div className="rounded-lg border border-border bg-background p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <img
            src={linkedin.avatar}
            alt={linkedin.name}
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-full border border-border object-cover"
          />
          <div className="min-w-0 pt-0.5">
            <p className="truncate font-semibold text-foreground">{linkedin.name}</p>
            <p className="text-sm leading-snug text-muted-foreground">{linkedin.headline}</p>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {linkedin.location} · {linkedin.connections}
        </p>

        <div className="mt-3 flex gap-2">
          <button type="button" tabIndex={-1} className="flex-1 rounded-full bg-[#0a66c2] px-4 py-1.5 text-sm font-semibold text-white">
            Connect
          </button>
          <button
            type="button"
            tabIndex={-1}
            className="flex-1 rounded-full border border-[#0a66c2] px-4 py-1.5 text-sm font-semibold text-[#0a66c2]"
          >
            Message
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'github') {
    const github = config.github
    return (
      <div className="rounded-2xl border border-border bg-background p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <img
            src={github.avatar}
            alt={github.name}
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-full border border-border object-cover"
          />
          <div className="min-w-0 pt-0.5">
            <p className="truncate font-semibold text-foreground">{github.name}</p>
            <p className="text-sm text-muted-foreground">@{github.username}</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-foreground/90">{github.bio}</p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="icon-[ri--book-2-line] size-3.5 shrink-0" />
          {github.repositories} repositories
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{github.followers}</span> followers ·{' '}
            <span className="font-semibold text-foreground">{github.following}</span> following
          </p>
          <button
            type="button"
            tabIndex={-1}
            className="shrink-0 rounded-md border border-border px-3 py-1 text-xs font-semibold text-foreground"
          >
            Follow
          </button>
        </div>
      </div>
    )
  }

  const threads = config.threads
  return (
    <div className="rounded-2xl border border-border bg-background p-4 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <img
          src={threads.avatar}
          alt={threads.name}
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-full border border-border object-cover"
        />
        <button type="button" tabIndex={-1} className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background">
          Follow
        </button>
      </div>

      <div className="mt-3">
        <p className="truncate font-semibold text-foreground">{threads.name}</p>
        <p className="text-sm text-muted-foreground">{threads.handle}</p>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{threads.bio}</p>

      <p className="mt-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{threads.followers}</span> followers
      </p>
    </div>
  )
}

export default SocialLinks
