import { toMusic } from '../../../utils/db'
import { ensureMusicOfDay } from '../../../utils/saveMusic'

// Devolve a música de hoje. Se ainda não existe, o app escolhe uma no Deezer e salva.
export default async function GetTodayMusic(req, res) {
  try {
    const row = await ensureMusicOfDay()
    res.status(200).json({ music: toMusic(row) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao buscar a música de hoje' })
  }
}
