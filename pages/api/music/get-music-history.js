import getDb, { toMusic } from '../../../utils/db'
import { getLastDays } from '../../../utils/dates'

// Música dos últimos 7 dias (hoje incluso), da mais recente para a mais antiga
export default function GetMusicHistory(req, res) {
  const days = getLastDays(7)
  const rows = getDb()
    .prepare(`SELECT * FROM music_day WHERE day IN (${days.map(() => '?').join(',')}) ORDER BY day DESC`)
    .all(...days)
  res.status(200).json({ music: rows.map(toMusic) })
}
