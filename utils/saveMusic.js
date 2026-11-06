import getDb from './db.js'
import { buildMusic, lookupMusic, playlistTracks } from './deezer.js'
import { todayISO } from './dates.js'

// Playlists públicas do Deezer usadas como fonte do sorteio (IDs separados por vírgula).
// Padrão: Top Brasil + Top Worldwide.
const playlists = () =>
  (process.env.DEEZER_PLAYLIST_IDS || '1111141961,3155776842').split(',').map(s => s.trim()).filter(Boolean)

const INSERT = `
  INSERT INTO music_day (day, name, author, album, year, cover, link_youtube, link_spotify, link_deezer)
  VALUES (:day, :name, :author, :album, :year, :cover, :link_youtube, :link_spotify, :link_deezer)
`
const UPSERT = `${INSERT}
  ON CONFLICT(day) DO UPDATE SET name=excluded.name, author=excluded.author, album=excluded.album,
    year=excluded.year, cover=excluded.cover, link_youtube=excluded.link_youtube,
    link_spotify=excluded.link_spotify, link_deezer=excluded.link_deezer
`
const INSERT_IF_FREE = `${INSERT} ON CONFLICT(day) DO NOTHING`

// Cadastro manual: busca por texto no Deezer e salva para o dia (substitui se já existir)
export async function saveMusicOfDay(query, day = todayISO()) {
  const m = await lookupMusic(query)
  if (!m) return null
  const db = await getDb()
  await db.execute({ sql: UPSERT, args: { day, ...m } })
  return { day, ...m }
}

// Sorteia uma faixa das playlists que ainda não tenha sido a música do dia
export async function pickRandomMusic() {
  const db = await getDb()
  const { rows } = await db.execute('SELECT link_deezer FROM music_day')
  const used = new Set(rows.map(r => r.link_deezer))

  const pool = []
  for (const id of playlists()) {
    try {
      pool.push(...(await playlistTracks(id)))
    } catch (err) {
      console.error(`Playlist ${id} indisponível`, err)
    }
  }
  if (!pool.length) return null

  const fresh = pool.filter(t => !used.has(t.link))
  const choices = fresh.length ? fresh : pool // se acabarem as inéditas, repete
  return buildMusic(choices[Math.floor(Math.random() * choices.length)])
}

// Garante que existe música para o dia: se não houver, sorteia e salva.
// Seguro contra duas visitas simultâneas (o 2º insert é ignorado pelo UNIQUE do dia).
export async function ensureMusicOfDay(day = todayISO()) {
  const db = await getDb()
  const find = async () =>
    (await db.execute({ sql: 'SELECT * FROM music_day WHERE day = ?', args: [day] })).rows[0]

  let row = await find()
  if (row) return row

  const m = await pickRandomMusic()
  if (!m) return null
  await db.execute({ sql: INSERT_IF_FREE, args: { day, ...m } })
  return find()
}
