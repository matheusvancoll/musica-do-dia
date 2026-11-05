import getDb, { toMusic } from '../../../utils/db'

export default function GetMusicList(req, res) {
  const rows = getDb().prepare('SELECT * FROM music_day ORDER BY day DESC').all()
  res.status(200).json({ music: rows.map(toMusic) })
}
