// API pública do Deezer (sem chave): https://developers.deezer.com/api
// Busca a faixa e monta nome, artista, álbum, ano, capa e links.
export async function lookupMusic(query) {
  const search = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=1`)
  if (!search.ok) throw new Error('Falha ao consultar o Deezer')
  const track = (await search.json()).data?.[0]
  if (!track) return null

  let year = null
  try {
    const album = await (await fetch(`https://api.deezer.com/album/${track.album.id}`)).json()
    year = album.release_date?.slice(0, 4) ?? null
  } catch {}

  const q = encodeURIComponent(`${track.title} ${track.artist.name}`)
  return {
    name: track.title,
    author: track.artist.name,
    album: track.album.title,
    year,
    cover: track.album.cover_big,
    link_deezer: track.link,
    // Spotify/YouTube sem chave: link de busca já filtrado pela música
    link_spotify: `https://open.spotify.com/search/${q}`,
    link_youtube: `https://www.youtube.com/results?search_query=${q}`,
  }
}
