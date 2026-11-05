import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} · Música do dia` : 'Música do dia'}</title>
        <meta name="description" content="Uma música nova todos os dias, escolhida a dedo." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg" aria-hidden="true">
        <span className="bg__blob bg__blob--violet" />
        <span className="bg__blob bg__blob--pink" />
        <span className="bg__blob bg__blob--orange" />
      </div>

      <div className="page">
        <Navbar />
        <main className="page__main">{children}</main>
        <footer className="footer">
          Feito por{' '}
          <a href="https://www.instagram.com/matheusvancoll/" target="_blank" rel="noreferrer">
            Matheus Vancoll
          </a>
        </footer>
      </div>
    </>
  )
}
