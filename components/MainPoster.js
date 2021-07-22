import Link from 'next/link'

export default function MainPoster() {

  return (
    <div className="main-poster">
      <div className="poster">
        <h4>Música do dia</h4>
        <Link href="/musica-hoje">
          <a>Conferir</a>
          </Link>
      </div>
    </div>
  )
}

