import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
  { href: '/', label: 'Início' },
  { href: '/musica-hoje', label: 'Hoje' },
  { href: '/historico', label: 'Histórico' },
]

export default function Navbar() {
  const { pathname } = useRouter()

  return (
    <header className="nav">
      <Link href="/" className="nav__brand">
        <span className="nav__disc" aria-hidden="true" />
        <span>Música do dia</span>
      </Link>

      <nav className="nav__links">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? 'nav__link is-active' : 'nav__link'}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
