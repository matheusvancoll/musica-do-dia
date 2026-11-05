// Uso: npm run add -- "Justin Bieber - One Time" [YYYY-MM-DD]
import { saveMusicOfDay } from '../utils/saveMusic.js'

const [query, day] = process.argv.slice(2)
if (!query) {
  console.error('Uso: npm run add -- "Artista - Música" [YYYY-MM-DD]')
  process.exit(1)
}
const m = await saveMusicOfDay(query, day)
console.log(m ? `Salvo (${m.day}): ${m.name} - ${m.author} (${m.album}, ${m.year})` : 'Música não encontrada')
