import useSWR from 'swr'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import getRoutersJson from '../utils/axios-api'
import { formatBR } from '../utils/dates'

export default function Historico() {
  const { data, error } = useSWR('/api/music/get-music-history', getRoutersJson)
  const list = data?.data?.music

  let content
  if (error) content = <p className="dm-history__state">Ops, não conseguimos carregar as informações</p>
  else if (!data) content = <p className="dm-history__state">Carregando...</p>
  else if (!list?.length) content = <p className="dm-history__state">Nenhuma música nos últimos 7 dias</p>
  else content = (
    <div className="dm-history__wrapper">
      <table className="dm-history__table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Música</th>
            <th>Artista</th>
            <th>Álbum</th>
            <th>Ano</th>
            <th>Ouvir</th>
          </tr>
        </thead>
        <tbody>
          {list.map(m => (
            <tr key={m.id}>
              <td data-label="Data">{formatBR(m.day)}</td>
              <td data-label="Música"><strong>{m.name}</strong></td>
              <td data-label="Artista">{m.author}</td>
              <td data-label="Álbum">{m.album}</td>
              <td data-label="Ano">{m.year}</td>
              <td data-label="Ouvir">
                <a href={m.link.deezer} target="_blank" rel="noreferrer">Deezer</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      <Head>
        <title>Histórico - Música do dia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="page-full rotated">
        <Navbar />
        <div className="dm-poster__container dm-history">
          <h3 className="dm-history__title">Últimos 7 dias</h3>
          {content}
        </div>

        <footer className="home-footer">
          <p>Powered by: <a href="https://www.instagram.com/matheusvancoll/" target="_blank" rel="noreferrer">Matheus Vancoll</a></p>
        </footer>
      </div>
    </>
  )
}
