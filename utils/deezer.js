// API pública do Deezer (sem chave): https://developers.deezer.com/api
import { findSpotifyLink } from './spotify.js'

const API = 'https://api.deezer.com'

async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Deezer respondeu ${res.status}`)
  return res.json()
}

// Transforma uma faixa do Deezer nos campos que o app salva
// (busca o ano no álbum e o link do Spotify, quando há chaves)
export async function buildMusic(track) {
  let year = null
  try {
    const album = await getJson(`${API}/album/${track.album.id}`)
    year = album.release_date?.slice(0, 4) ?? null
  } catch {}

  const name = track.title
  const author = track.artist.name
  const q = encodeURIComponent(`${name} ${author}`)
  const spotify = await findSpotifyLink({ isrc: track.isrc, name, author })

  return {
    name,
    author,
    album: track.album.title,
    year,
    cover: track.album.cover_big,
    link_deezer: track.link,
    link_spotify: spotify ?? `https://open.spotify.com/search/${q}`,
    link_youtube: `https://www.youtube.com/results?search_query=${q}`,
  }
}

// Busca manual por texto ("Artista - Música")
export async function lookupMusic(query) {
  const track = (await getJson(`${API}/search?q=${encodeURIComponent(query)}&limit=1`)).data?.[0]
  return track ? buildMusic(track) : null
}

// Faixas de uma playlist pública (ex.: rankings "Top Brasil", "Top Worldwide")
export async function playlistTracks(playlistId) {
  const json = await getJson(`${API}/playlist/${playlistId}/tracks?limit=100`)
  return (json.data ?? []).filter(t => t.readable !== false && t.album?.id)
}
