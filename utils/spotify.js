// Opcional: com SPOTIFY_CLIENT_ID e SPOTIFY_CLIENT_SECRET (developer.spotify.com/dashboard)
// o app acha o link direto da faixa pelo ISRC. Sem as chaves, devolve null e o app usa um link de busca.
const g = globalThis

async function getToken() {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env
  if (!id || !secret) return null
  if (g._spotifyToken && g._spotifyToken.exp > Date.now()) return g._spotifyToken.value

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) return null
  const json = await res.json()
  g._spotifyToken = { value: json.access_token, exp: Date.now() + (json.expires_in - 60) * 1000 }
  return g._spotifyToken.value
}

export async function findSpotifyLink({ isrc, name, author }) {
  try {
    const token = await getToken()
    if (!token) return null

    const q = isrc ? `isrc:${isrc}` : `track:${name} artist:${author}`
    const res = await fetch(`https://api.spotify.com/v1/search?type=track&limit=1&q=${encodeURIComponent(q)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return null
    return (await res.json()).tracks?.items?.[0]?.external_urls?.spotify ?? null
  } catch {
    return null
  }
}
