import { saveMusicOfDay } from '../../../utils/saveMusic'

// POST { query: "Justin Bieber - One Time", day?: "2026-11-04" }
// Os dados (álbum, ano, capa, links) vêm do Deezer.
export default async function insertNewMusicList(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Wrong request method' })

  const { query, day } = req.body ?? {}
  if (!query) return res.status(400).json({ message: 'Missing body data' })
  if (day && !/^\d{4}-\d{2}-\d{2}$/.test(day)) return res.status(400).json({ message: 'day deve ser YYYY-MM-DD' })

  try {
    const music = await saveMusicOfDay(query, day || undefined)
    if (!music) return res.status(404).json({ message: 'Música não encontrada' })
    res.status(200).json({ music })
  } catch (err) {
    console.error(err)
    res.status(502).json({ message: 'Erro ao consultar o Deezer' })
  }
}
