import getDb from './db.js'
import { lookupMusic } from './deezer.js'
import { todayISO } from './dates.js'

// Busca a música no Deezer e salva para o dia (padrão: hoje). Substitui se o dia já existir.
export async function saveMusicOfDay(query, day = todayISO()) {
  const m = await lookupMusic(query)
  if (!m) return null
  const db = await getDb()
  await db.execute({
    sql: `
      INSERT INTO music_day (day, name, author, album, year, cover, link_youtube, link_spotify, link_deezer)
      VALUES (:day, :name, :author, :album, :year, :cover, :link_youtube, :link_spotify, :link_deezer)
      ON CONFLICT(day) DO UPDATE SET name=excluded.name, author=excluded.author, album=excluded.album,
        year=excluded.year, cover=excluded.cover, link_youtube=excluded.link_youtube,
        link_spotify=excluded.link_spotify, link_deezer=excluded.link_deezer
    `,
    args: { day, ...m },
  })
  return { day, ...m }
}
