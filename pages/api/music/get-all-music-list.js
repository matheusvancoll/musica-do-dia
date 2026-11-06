import getDb, { toMusic } from '../../../utils/db'

export default async function GetMusicList(req, res) {
  try {
    const db = await getDb()
    const { rows } = await db.execute('SELECT * FROM music_day ORDER BY day DESC')
    res.status(200).json({ music: rows.map(toMusic) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao buscar a lista' })
  }
}
