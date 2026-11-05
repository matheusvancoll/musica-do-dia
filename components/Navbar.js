import Link from 'next/link'


export default function MainPoster() {
  return (
    <div className="main-poster">
      <div className="header-navbar">
        <Link href="/">Início</Link>

        <Link href="/musica-hoje">Recomendação de Hoje</Link>

        <Link href="/historico">Histórico</Link>
      </div>
  </div>
  )
}

