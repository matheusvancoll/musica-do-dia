import getDb, { toMusic } from '../../../utils/db'
import { getLastDays } from '../../../utils/dates'

// Música dos últimos 7 dias (hoje incluso), da mais recente para a mais antiga
export default async function GetMusicHistory(req, res) {
  try {
    const days = getLastDays(7)
    const db = await getDb()
    const { rows } = await db.execute({
      sql: `SELECT * FROM music_day WHERE day IN (${days.map(() => '?').join(',')}) ORDER BY day DESC`,
      args: days,
    })
    res.status(200).json({ music: rows.map(toMusic) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao buscar o histórico' })
  }
}
