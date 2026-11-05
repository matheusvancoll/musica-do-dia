import useSWR from 'swr'
import Layout from '../components/Layout'
import getRoutersJson from '../utils/axios-api'
import { formatBR, todayISO } from '../utils/dates'

export default function Historico() {
  const { data, error } = useSWR('/api/music/get-music-history', getRoutersJson)
  const list = data?.data?.music

  let content
  if (error) content = <p className="muted-center">Ops, não conseguimos carregar as informações.</p>
  else if (!data) content = <p className="muted-center">Carregando...</p>
  else if (!list?.length) content = <p className="muted-center">Nenhuma música nos últimos 7 dias.</p>
  else {
    const today = todayISO()
    content = (
      <div className="history__card">
        <table className="history__table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Música</th>
              <th>Álbum</th>
              <th>Ano</th>
              <th>Ouvir</th>
            </tr>
          </thead>
          <tbody>
            {list.map(m => (
              <tr key={m.id} className={m.day === today ? 'is-today' : undefined}>
                <td data-label="Data">
                  <span className="history__date">{formatBR(m.day)}</span>
                  {m.day === today && <span className="badge">Hoje</span>}
                </td>
                <td data-label="Música">
                  <div className="track">
                    {m.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="track__cover" src={m.cover} alt="" loading="lazy" />
                    ) : (
                      <span className="track__cover track__cover--empty">♪</span>
                    )}
                    <span className="track__text">
                      <strong>{m.name}</strong>
                      <small>{m.author}</small>
                    </span>
                  </div>
                </td>
                <td data-label="Álbum">{m.album}</td>
                <td data-label="Ano">{m.year}</td>
                <td data-label="Ouvir">
                  <a className="listen" href={m.link.deezer} target="_blank" rel="noreferrer">
                    ▶ Ouvir
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <Layout title="Histórico">
      <section className="history">
        <p className="eyebrow">
          <span className="eyebrow__dot" /> Replay
        </p>
        <h1 className="history__title">Últimos 7 dias</h1>
        {content}
      </section>
    </Layout>
  )
}
