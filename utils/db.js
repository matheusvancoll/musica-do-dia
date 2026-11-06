import { createClient } from '@libsql/client'
import fs from 'node:fs'

// Produção (Vercel): defina TURSO_DATABASE_URL e TURSO_AUTH_TOKEN.
// Local: sem variáveis, usa o arquivo data/musica-do-dia.db.
const url = process.env.TURSO_DATABASE_URL || 'file:data/musica-do-dia.db'

// Reaproveita a conexão entre hot-reloads / invocações
const g = globalThis

export default function getDb() {
  if (!g._dbReady) {
    if (url.startsWith('file:')) fs.mkdirSync('data', { recursive: true })

    const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
    g._dbReady = client
      .execute(`
        CREATE TABLE IF NOT EXISTS music_day (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          day TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          author TEXT NOT NULL,
          album TEXT,
          year TEXT,
          cover TEXT,
          link_youtube TEXT,
          link_spotify TEXT,
          link_deezer TEXT,
          amount_view INTEGER NOT NULL DEFAULT 0
        )
      `)
      .then(() => client)
      .catch(err => {
        g._dbReady = null // tenta de novo na próxima requisição
        throw err
      })
  }
  return g._dbReady
}

// Converte a linha do banco no formato usado pelo front
export function toMusic(r) {
  if (!r) return null
  return {
    id: Number(r.id),
    day: r.day,
    name: r.name,
    author: r.author,
    album: r.album,
    year: r.year,
    cover: r.cover,
    amountView: Number(r.amount_view),
    link: { youtube: r.link_youtube, spotify: r.link_spotify, deezer: r.link_deezer },
  }
}
