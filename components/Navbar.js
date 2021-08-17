import Link from 'next/link'


export default function MainPoster() {
  return (
    <div className="main-poster">
      <div className="header-navbar">
        <Link href="/">
          <a>Início</a>
        </Link>

        <Link href="/musica-hoje">
          <a>Recomendação de Hoje</a>
        </Link>

        <Link href="/sugerir-musica">
          <a>Sugerir Música</a>
        </Link> 
      </div>
  </div>
  )
}

