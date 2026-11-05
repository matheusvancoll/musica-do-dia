const iso = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Sao_Paulo' }) // YYYY-MM-DD
const br = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' })

export const todayISO = () => iso.format(new Date())

// Datas (YYYY-MM-DD) dos últimos `days` dias, de hoje para trás
export function getLastDays(days = 7) {
  const now = Date.now()
  return Array.from({ length: days }, (_, i) => iso.format(new Date(now - i * 86400000)))
}

// 2026-11-04 -> 04/11/2026
export const formatBR = d => br.format(new Date(`${d}T12:00:00-03:00`))
