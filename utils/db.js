import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const file = process.env.SQLITE_PATH || path.join(process.cwd(), 'data', 'musica-do-dia.db')

// Reaproveita a conexão entre hot-reloads
const g = globalThis

export default function getDb() {
  if (!g._sqliteDb) {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    const db = new Database(file)
    db.pragma('journal_mode = WAL')
    db.exec(`
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
      );
    `)
    g._sqliteDb = db
  }
  return g._sqliteDb
}

// Converte a linha do banco no formato usado pelo front
export function toMusic(r) {
  if (!r) return null
  return {
    id: r.id,
    day: r.day,
    name: r.name,
    author: r.author,
    album: r.album,
    year: r.year,
    cover: r.cover,
    amountView: r.amount_view,
    link: { youtube: r.link_youtube, spotify: r.link_spotify, deezer: r.link_deezer },
  }
}
