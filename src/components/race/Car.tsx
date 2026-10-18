interface Props {
  color: string
  variant: number
}

const OUTLINE = '#0a1a2f'
const GLASS = '#10233b'

export default function Car({ color, variant }: Props) {
  const kind = variant % 3
  return (
    <svg viewBox="0 0 80 150" className="h-full w-full overflow-visible" aria-hidden="true">
      <ellipse cx="42" cy="82" rx="30" ry="62" fill="rgba(0,0,0,0.35)" />
      <g stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round">
        {kind === 0 && <Sport color={color} />}
        {kind === 1 && <Formula color={color} />}
        {kind === 2 && <Muscle color={color} />}
      </g>
    </svg>
  )
}

function Wheel({ x, y, w = 11, h = 24 }: { x: number; y: number; w?: number; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="4" fill="#1b2433" />
}

function Sport({ color }: { color: string }) {
  return (
    <>
      <Wheel x={6} y={28} />
      <Wheel x={63} y={28} />
      <Wheel x={6} y={96} />
      <Wheel x={63} y={96} />
      <path d="M40 4c17 0 26 10 26 28l2 78c0 18-10 34-28 34S12 128 12 110l2-78C14 14 23 4 40 4z" fill={color} />
      <path d="M22 48c0-8 8-12 18-12s18 4 18 12l-3 16H25z" fill={GLASS} />
      <path d="M25 70h30l1 22c-6 3-10 4-16 4s-10-1-16-4z" fill={GLASS} />
      <path d="M26 106h28v10H26z" fill="rgba(255,255,255,0.25)" stroke="none" />
      <path d="M20 16c3-5 8-7 12-7" stroke="#fff" strokeOpacity="0.6" fill="none" strokeLinecap="round" />
      <rect x="21" y="130" width="12" height="5" rx="2" fill="#ff5d5d" stroke="none" />
      <rect x="47" y="130" width="12" height="5" rx="2" fill="#ff5d5d" stroke="none" />
    </>
  )
}

function Formula({ color }: { color: string }) {
  return (
    <>
      <Wheel x={4} y={34} w={14} h={26} />
      <Wheel x={62} y={34} w={14} h={26} />
      <Wheel x={3} y={100} w={15} h={28} />
      <Wheel x={62} y={100} w={15} h={28} />
      <rect x="12" y="6" width="56" height="9" rx="4" fill="#ffd23f" />
      <path d="M36 12h8l3 50 8 22v28H25V84l8-22z" fill={color} />
      <rect x="31" y="22" width="18" height="30" rx="2" fill="#ffd23f" />
      <ellipse cx="40" cy="70" rx="7" ry="11" fill={GLASS} />
      <rect x="14" y="128" width="52" height="12" rx="4" fill="#ffd23f" />
      <rect x="35" y="86" width="10" height="26" rx="2" fill="#ff5d5d" stroke="none" />
    </>
  )
}

function Muscle({ color }: { color: string }) {
  return (
    <>
      <Wheel x={6} y={30} />
      <Wheel x={63} y={30} />
      <Wheel x={6} y={98} />
      <Wheel x={63} y={98} />
      <path d="M40 4c16 0 25 9 25 26l3 82c0 16-10 32-28 32S12 128 12 112l3-82C15 13 24 4 40 4z" fill={color} />
      <rect x="29" y="6" width="8" height="136" fill="#fff" stroke="none" />
      <rect x="43" y="6" width="8" height="136" fill="#fff" stroke="none" />
      <path d="M22 52c0-8 8-11 18-11s18 3 18 11l-3 13H25z" fill={GLASS} />
      <path d="M26 74h28l1 18c-5 3-9 4-15 4s-10-1-15-4z" fill={GLASS} />
      <rect x="10" y="62" width="6" height="8" rx="2" fill={color} />
      <rect x="64" y="62" width="6" height="8" rx="2" fill={color} />
    </>
  )
}
