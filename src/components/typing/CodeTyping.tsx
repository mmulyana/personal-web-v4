import { useCallback, useEffect, useMemo, useState } from 'react'
import { snippets } from './snippets'

// Indentasi di-skip otomatis seperti editor, jadi yang dilatih cuma isi kodenya.
function skipIndent(code: string, from: number) {
  let i = from
  while (code[i] === ' ') i++
  return i
}

export default function CodeTyping({ colors }: { colors: string[][] }) {
  const [index, setIndex] = useState(0)
  const [pos, setPos] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [wrong, setWrong] = useState(false)

  const snippet = snippets[index]
  const code = snippet.code
  const done = pos >= code.length

  const reset = useCallback((next: number) => {
    setIndex(next)
    setPos(0)
    setMistakes(0)
    setWrong(false)
  }, [])

  const nextRandom = useCallback(() => {
    if (snippets.length < 2) return reset(0)
    let next = index
    while (next === index) next = Math.floor(Math.random() * snippets.length)
    reset(next)
  }, [index, reset])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'Escape') return reset(index)
      if (done) {
        if (e.key === 'Enter') nextRandom()
        return
      }
      if (e.key === 'Tab') return e.preventDefault()

      const expected = code[pos]
      const typed = e.key === 'Enter' ? '\n' : e.key
      if (typed.length !== 1) return
      e.preventDefault()

      if (typed === expected) {
        setWrong(false)
        setPos(typed === '\n' ? skipIndent(code, pos + 1) : pos + 1)
      } else {
        setWrong(true)
        setMistakes((m) => m + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [code, pos, done, index, reset, nextRandom])

  const chars = useMemo(() => Array.from(code), [code])

  const groups = useMemo(() => {
    const map = new Map<string, number[]>()
    snippets.forEach((s, i) => map.set(s.group, [...(map.get(s.group) ?? []), i]))
    return Array.from(map)
  }, [])

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-4 py-10 text-neutral-300 md:flex-row md:gap-10">
      <select
        aria-label="Pilih snippet"
        value={index}
        onChange={(e) => {
          e.currentTarget.blur()
          reset(Number(e.target.value))
        }}
        className="rounded bg-neutral-800 px-3 py-2 text-sm md:hidden"
      >
        {groups.map(([group, ids]) => (
          <optgroup key={group} label={group}>
            {ids.map((i) => (
              <option key={snippets[i].title} value={i}>
                {snippets[i].title}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <aside className="hidden md:sticky md:top-10 md:block md:max-h-[calc(100vh-5rem)] md:w-56 md:shrink-0 md:overflow-y-auto">
        <nav className="flex flex-col gap-5">
          {groups.map(([lang, ids]) => (
            <div key={lang}>
              <h2 className="mb-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase">{lang}</h2>
              <ul className="flex flex-col gap-0.5">
                {ids.map((i) => (
                  <li key={snippets[i].title}>
                    <button
                      onClick={(e) => {
                        e.currentTarget.blur()
                        reset(i)
                      }}
                      className={`w-full rounded px-3 py-1.5 text-left text-sm transition ${
                        i === index ? 'bg-amber-400 text-neutral-900' : 'hover:bg-neutral-800'
                      }`}
                    >
                      {snippets[i].title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-6">
        <pre className="rounded-lg bg-neutral-900 p-5 font-mono text-base leading-7 break-words whitespace-pre-wrap [font-variant-ligatures:none]">
          {chars.map((ch, i) => {
            const isCurrent = i === pos
            const typed = i < pos
            const showWrong = isCurrent && wrong
            return (
              <span
                key={i}
                style={{
                  color: showWrong ? '#fca5a5' : colors[index]?.[i],
                  opacity: typed || showWrong ? 1 : 0.35,
                }}
                className={`${showWrong ? 'bg-red-500/40' : ''} ${isCurrent && !done ? 'border-l-2 border-amber-400' : ''}`}
              >
                {ch === '\n' && i >= pos ? '↵\n' : ch}
              </span>
            )
          })}
        </pre>

        <footer className="flex items-center justify-between text-sm text-neutral-500">
          <span>
            {snippet.lang} · salah: {mistakes}
          </span>
          {done ? (
            <button onClick={nextRandom} className="rounded bg-amber-400 px-3 py-1 text-neutral-900">
              Selesai! Enter untuk lanjut
            </button>
          ) : (
            <span>Esc untuk ulang</span>
          )}
        </footer>
      </main>
    </div>
  )
}
