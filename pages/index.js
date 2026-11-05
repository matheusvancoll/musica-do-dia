import Link from 'next/link'
import Layout from '../components/Layout'
import Vinyl from '../components/Vinyl'

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">
            <span className="eyebrow__dot" /> Uma música. Todo dia.
          </p>
          <h1 className="hero__title">
            Música
            <br />
            do dia
          </h1>
          <p className="hero__sub">
            Sua dose diária de som, escolhida a dedo. Sem playlist infinita, sem algoritmo: só uma
            faixa por dia pra você ouvir, curtir e descobrir.
          </p>
          <div className="hero__actions">
            <Link href="/musica-hoje" className="btn btn--primary">
              ▶ Ouvir a de hoje
            </Link>
            <Link href="/historico" className="btn btn--ghost">
              Últimos 7 dias
            </Link>
          </div>
        </div>

        <div className="hero__art">
          <Vinyl className="vinyl--hero" />
        </div>
      </section>
    </Layout>
  )
}
