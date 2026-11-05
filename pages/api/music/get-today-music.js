import getDb, { toMusic } from '../../../utils/db'
import { todayISO } from '../../../utils/dates'

export default function GetTodayMusic(req, res) {
  const db = getDb()
  const row = db.prepare('SELECT * FROM music_day WHERE day = ?').get(todayISO())
  if (row) db.prepare('UPDATE music_day SET amount_view = amount_view + 1 WHERE id = ?').run(row.id)
  res.status(200).json({ music: toMusic(row) })
}
