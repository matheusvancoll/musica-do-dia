import Vinyl from './Vinyl'
import { formatBR } from '../utils/dates'

const platforms = [
  { key: 'deezer', label: 'Deezer' },
  { key: 'spotify', label: 'Spotify' },
  { key: 'youtube', label: 'YouTube' },
]

export default function CardMusic({ music }) {
  return (
    <section className="today">
      <div className="today__art">
        <Vinyl cover={music.cover} className="today__vinyl" />
        {music.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="today__cover" src={music.cover} alt={`Capa de ${music.album}`} />
        ) : (
          <div className="today__cover today__cover--empty">♪</div>
        )}
      </div>

      <div className="today__info">
        <p className="eyebrow">
          <span className="eyebrow__dot" /> Música do dia · {formatBR(music.day)}
        </p>
        <h1 className="today__title">{music.name}</h1>
        <h2 className="today__author">{music.author}</h2>

        <ul className="chips">
          {music.album && <li className="chip">💿 {music.album}</li>}
          {music.year && <li className="chip">📅 {music.year}</li>}
        </ul>

        <div className="platforms">
          {platforms.map(p => (
            <a
              key={p.key}
              className={`platform platform--${p.key}`}
              href={music.link[p.key]}
              target="_blank"
              rel="noreferrer"
            >
              <span className="platform__play">▶</span> Ouvir no {p.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
