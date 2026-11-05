import Link from 'next/link'
import useSWR from 'swr'
import Layout from '../components/Layout'
import CardMusic from '../components/CardMusic'
import Vinyl from '../components/Vinyl'
import getRoutersJson from '../utils/axios-api'

function State({ title, text, action }) {
  return (
    <div className="state">
      <Vinyl className="vinyl--small" />
      <h1 className="state__title">{title}</h1>
      <p className="state__text">{text}</p>
      {action && (
        <Link href={action.href} className="btn btn--ghost">
          {action.label}
        </Link>
      )}
    </div>
  )
}

export default function MusicaHoje() {
  const { data, error } = useSWR('/api/music/get-today-music', getRoutersJson)
  const music = data?.data?.music

  let content
  if (error) content = <State title="Ops!" text="Não conseguimos carregar as informações." />
  else if (!data) content = <State title="Carregando..." text="Colocando o disco na vitrola." />
  else if (!music)
    content = (
      <State
        title="Ainda sem música hoje"
        text="A faixa de hoje ainda não foi escolhida. Volte daqui a pouco, ou veja as anteriores."
        action={{ href: '/historico', label: 'Ver histórico' }}
      />
    )
  else content = <CardMusic music={music} />

  return <Layout title="Hoje">{content}</Layout>
}
