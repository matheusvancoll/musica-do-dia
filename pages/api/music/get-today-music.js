import getDb, { toMusic } from '../../../utils/db'
import { todayISO } from '../../../utils/dates'

export default async function GetTodayMusic(req, res) {
  try {
    const db = await getDb()
    const { rows } = await db.execute({ sql: 'SELECT * FROM music_day WHERE day = ?', args: [todayISO()] })
    const row = rows[0]
    if (row) {
      await db.execute({ sql: 'UPDATE music_day SET amount_view = amount_view + 1 WHERE id = ?', args: [row.id] })
    }
    res.status(200).json({ music: toMusic(row) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao buscar a música de hoje' })
  }
}
