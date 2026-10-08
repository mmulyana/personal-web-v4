// note: no imports so it can run in the browser
export function formatDuration(startIso: string, endIso: string): string {
  const start = new Date(startIso)
  const end = endIso ? new Date(endIso) : new Date()
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1
  if (months <= 0) return ''

  const years = Math.floor(months / 12)
  const remMonths = months % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  if (remMonths > 0 || years === 0) parts.push(`${remMonths} ${remMonths === 1 ? 'mo' : 'mos'}`)
  return parts.join(' ')
}
