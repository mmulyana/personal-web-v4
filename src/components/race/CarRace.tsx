import { useCallback, useEffect, useRef, useState } from 'react'
import Car from './Car'
import { cn } from '~/lib/utils'

const COLORS = ['#7dff4f', '#ff4fd8', '#ff8a3d', '#4fd3ff', '#ffd23f', '#a06bff', '#ff5d6c', '#2fe0b5']
const DEFAULT_NAMES = 'Andi\nBudi\nCitra\nDewi\nEko'
const MAX_NAMES = 30

type Phase = 'idle' | 'countdown' | 'racing' | 'done'

interface Racer {
  name: string
  color: string
  base: number
  speed: number
  target: number
}

const parseNames = (text: string) =>
  text
    .split('\n')
    .map((n) => n.trim())
    .filter(Boolean)
    .slice(0, MAX_NAMES)

function buildRacers(names: string[]): Racer[] {
  const colors = [...COLORS].sort(() => Math.random() - 0.5)
  return names.map((name, i) => {
    const base = 12 + Math.random() * 26
    return { name, color: colors[i % colors.length], base, speed: base, target: base }
  })
}

const chunky = 'rounded-2xl border-b-[5px] font-extrabold uppercase tracking-wide transition active:translate-y-[3px] active:border-b-2'

export default function CarRace() {
  const [text, setText] = useState(DEFAULT_NAMES)
  const [phase, setPhase] = useState<Phase>('idle')
  const [count, setCount] = useState(3)
  const [racers, setRacers] = useState<Racer[]>([])
  const [positions, setPositions] = useState<number[]>([])
  const [winner, setWinner] = useState<number | null>(null)
  const [editing, setEditing] = useState(false)

  const raf = useRef(0)
  const timer = useRef(0)

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current)
    clearTimeout(timer.current)
  }, [])

  useEffect(() => stop, [stop])

  const names = parseNames(text)
  const canStart = names.length >= 2 && (phase === 'idle' || phase === 'done')
  const moving = phase === 'racing'
  // note: before the first race the lanes follow the textarea live
  const shown = phase === 'idle' ? names.map((name, i) => ({ name, color: COLORS[i % COLORS.length] })) : racers

  const run = (cars: Racer[]) => {
    let last = performance.now()
    let pos = cars.map(() => 0)
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      let first = -1
      let best = 0
      pos = pos.map((p, i) => {
        const car = cars[i]
        // note: wide random targets so the lead keeps changing
        if (Math.random() < dt * 2.5) car.target = car.base * (0.05 + Math.random() * 2.8)
        car.speed += (car.target - car.speed) * Math.min(1, dt * 12)
        const next = Math.min(100, p + (car.speed * dt) / 5)
        if (next >= 100 && next >= best) {
          best = next
          first = i
        }
        return next
      })
      setPositions(pos)
      if (first !== -1) {
        setWinner(first)
        setPhase('done')
        return
      }
      raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)
  }

  const startRace = () => {
    stop()
    const next = buildRacers(names)
    setRacers(next)
    setPositions(next.map(() => 0))
    setWinner(null)
    setPhase('countdown')
    setCount(3)

    let n = 3
    const tick = () => {
      n -= 1
      if (n > 0) {
        setCount(n)
        timer.current = window.setTimeout(tick, 800)
      } else {
        setPhase('racing')
        run(next)
      }
    }
    timer.current = window.setTimeout(tick, 800)
  }

  const backToLobby = () => {
    stop()
    setPhase('idle')
    setWinner(null)
    setPositions([])
  }

  const many = shown.length > 10
  const lobby = phase === 'idle' || phase === 'done'

  return (
    <div className="relative h-dvh w-screen select-none overflow-hidden font-sans text-white">
      <style>{`
        @keyframes race-streak { from { background-position-y: 0 } to { background-position-y: 240px } }
        @keyframes race-pop { 0% { transform: scale(.3); opacity: 0 } 40% { transform: scale(1.15); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
        @keyframes race-flame { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(1.5) } }
        @keyframes race-idle { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        .race-bg {
          background:
            repeating-linear-gradient(115deg, transparent 0 140px, rgba(255,255,255,.035) 140px 280px),
            radial-gradient(120% 80% at 50% 0%, #12507a 0%, #0b2a47 55%, #081c33 100%);
        }
        .race-streaks {
          background: repeating-linear-gradient(to bottom, rgba(255,255,255,.35) 0 36px, transparent 36px 120px);
          background-size: 3px 240px;
          background-repeat: repeat-y;
          animation: race-streak .45s linear infinite;
          animation-play-state: paused;
          mask-image: linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent);
        }
        .race-moving .race-streaks { animation-play-state: running; }
        .race-countdown { animation: race-pop .8s ease-out; }
        .race-flame { transform-origin: top; animation: race-flame .12s linear infinite; }
        .race-car-idle { animation: race-idle 2.4s ease-in-out infinite; }
      `}</style>

      <div className="race-bg absolute inset-0" />

      <div className={cn('absolute inset-0 mx-auto flex max-w-5xl', moving && 'race-moving')}>
        {shown.map((car, i) => {
          const p = positions[i] ?? 0
          const dim = phase === 'done' && winner !== i
          return (
            <div key={`${car.name}-${i}`} className={cn('relative min-w-0 flex-1 transition-opacity duration-500', dim && 'opacity-40')}>
              <div
                className={cn('absolute top-24 bottom-0', many ? 'inset-x-px' : 'inset-x-1')}
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, ${car.color}55 45%, ${car.color}cc 100%)`,
                  maskImage: 'linear-gradient(to bottom, transparent, #000 30%)',
                }}
              />
              <div className="race-streaks absolute inset-x-0 top-24 bottom-0 mx-auto w-[3px] opacity-60" style={{ left: '30%' }} />
              <div className="race-streaks absolute inset-x-0 top-24 bottom-0 mx-auto w-[3px] opacity-60" style={{ left: '70%', animationDuration: '.6s' }} />

              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ width: 'min(80%, 76px)', aspectRatio: '80 / 150', bottom: `calc(24px + (100% - 24px - 250px) * ${p / 100})` }}
              >
                <div className={cn('h-full', phase === 'idle' && 'race-car-idle')}>
                  <Car color={car.color} variant={i} />
                </div>
                {(moving || phase === 'countdown') && (
                  <span
                    className="race-flame absolute left-1/2 top-[96%] h-[28%] w-[16%] -translate-x-1/2 rounded-b-full"
                    style={{ background: 'linear-gradient(to bottom, #fff, #4fd3ff 40%, transparent)' }}
                  />
                )}
                <span
                  className={cn(
                    'absolute left-1/2 truncate rounded-full bg-black/45 font-bold backdrop-blur',
                    many
                      ? 'bottom-full mb-1 max-h-24 -translate-x-1/2 rotate-180 px-0.5 py-1 [writing-mode:vertical-rl]'
                      : '-top-7 max-w-[110px] -translate-x-1/2 px-2.5 py-0.5 text-xs',
                    many && (shown.length > 20 ? 'text-[9px]' : 'text-[11px]'),
                    winner === i && 'bg-yellow-300 text-[#0b2a47]',
                  )}
                >
                  {car.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-4 opacity-95"
        style={{
          transform: `translateY(${-30 + 200 * Math.min(1, Math.max(0, (Math.max(0, ...positions) - 50) / 50))}px)`,
          backgroundImage: 'conic-gradient(#fff 25%, #0a1a2f 0 50%, #fff 0 75%, #0a1a2f 0)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
        <a
          href="/"
          aria-label="Back to home"
          className="flex size-12 items-center justify-center rounded-full border-b-4 border-[#1b8a74] bg-[#2fe0b5] text-[#0b2a47]"
        >
          <span className="icon-[ph--house-bold] size-6" />
        </a>
        <div className="flex items-center gap-3 rounded-full bg-black/30 px-4 py-2 text-sm font-extrabold uppercase tracking-wider">
          <span className="text-white/70">Racers</span>
          <span className="rounded-full bg-[#ffb23f] px-3 py-0.5 text-[#0b2a47]">{shown.length}</span>
        </div>
        <button
          type="button"
          aria-label="Edit names"
          disabled={!lobby}
          onClick={() => setEditing(true)}
          className="flex size-12 items-center justify-center rounded-full border-b-4 border-[#6a45c9] bg-[#a06bff] text-white disabled:opacity-40"
        >
          <span className="icon-[ph--users-three-bold] size-6" />
        </button>
      </div>

      <div
        className={cn(
          'absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-[#081c33] via-[#081c33]/60 to-transparent px-5 pb-5 pt-10 transition-all duration-300',
          !lobby && 'pointer-events-none translate-y-8 opacity-0',
        )}
      >
        <div className="flex w-full max-w-sm gap-3">
          <button
            type="button"
            onClick={startRace}
            disabled={!canStart}
            className={cn(chunky, 'flex-1 border-[#c4452f] bg-[#ff6b4a] py-3.5 text-2xl disabled:opacity-50')}
          >
            {phase === 'done' ? 'Race again' : 'Play'}
          </button>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className={cn(chunky, 'border-[#c9c2e6] bg-white px-5 text-sm text-[#ff6b4a]')}
          >
            Names
          </button>
        </div>
        {names.length < 2 && <p className="text-xs text-white/70">Need at least 2 names</p>}
      </div>

      {phase === 'countdown' && (
        <div key={count} className="race-countdown pointer-events-none absolute inset-0 flex items-center justify-center text-[10rem] font-black text-white drop-shadow-[0_8px_0_rgba(0,0,0,0.35)]">
          {count}
        </div>
      )}

      {phase === 'done' && winner !== null && (
        <div className="race-countdown pointer-events-none absolute inset-x-0 top-[26%] flex flex-col items-center gap-2">
          <span className="text-sm font-extrabold uppercase tracking-[0.3em] text-yellow-200">Winner</span>
          <span className="max-w-[90vw] truncate rounded-3xl border-b-[6px] border-[#c98f12] bg-[#ffd23f] px-8 py-3 text-4xl font-black text-[#0b2a47] shadow-2xl sm:text-6xl">
            {racers[winner].name}
          </span>
        </div>
      )}

      {editing && (
        <div className="absolute inset-0 z-10 flex items-end justify-center bg-black/60 sm:items-center" onClick={() => setEditing(false)}>
          <div
            className="w-full max-w-md rounded-t-3xl bg-[#12395c] p-6 shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-extrabold uppercase tracking-wide">Racers</h2>
            <p className="mt-1 text-xs text-white/60">One name per line, max {MAX_NAMES}</p>
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="mt-3 w-full resize-none rounded-2xl border-2 border-white/10 bg-[#0b2a47] p-3 text-base text-white outline-none focus:border-[#4fd3ff]"
            />
            <button
              type="button"
              onClick={() => {
                if (phase === 'done') backToLobby()
                setEditing(false)
              }}
              className={cn(chunky, 'mt-4 w-full border-[#1b8a74] bg-[#2fe0b5] py-3 text-lg text-[#0b2a47]')}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
