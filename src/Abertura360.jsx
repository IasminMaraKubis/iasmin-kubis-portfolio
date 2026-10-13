import { useEffect, useMemo, useState } from 'react'
import './Abertura360.css'
import { useIdioma } from './Idioma'

const textos = {
  pt: {
    eyebrow: 'PORTFÓLIO INTERATIVO',
    titulo: 'IASMIN KUBIS',
    subtitulo: 'Desenvolvedora de Software',
    descricao: 'Interfaces criativas, integração de APIs e experiências digitais com personalidade.',
    botao: 'Entrar agora',
    dica: 'A apresentação continua até você entrar'
  },
  en: {
    eyebrow: 'INTERACTIVE PORTFOLIO',
    titulo: 'IASMIN KUBIS',
    subtitulo: 'Software Developer',
    descricao: 'Creative interfaces, API integrations, and digital experiences with personality.',
    botao: 'Enter now',
    dica: 'The presentation continues until you enter'
  }
}

const frames = [
  { src: '/abertura360/frente.png', classe: 'frame-frente' },
  { src: '/abertura360/acenando.png', classe: 'frame-acenando' },
  { src: '/abertura360/apontando.png', classe: 'frame-apontando' },
  { src: '/abertura360/brilho.png', classe: 'frame-brilho' }
]

function Abertura360({ onFinish }) {
  const { idioma, setIdioma } = useIdioma()
  const [frameAtual, setFrameAtual] = useState(0)
  const [encerrando, setEncerrando] = useState(false)
  const t = useMemo(() => textos[idioma] || textos.pt, [idioma])

  useEffect(() => {
    const alternar = setInterval(() => {
      setFrameAtual((atual) => (atual + 1) % frames.length)
    }, 1100)

    return () => clearInterval(alternar)
  }, [])

  function fecharAbertura() {
    if (encerrando) return
    setEncerrando(true)
    setTimeout(() => {
      onFinish?.()
    }, 550)
  }

  return (
    <div className={`abertura360 ${encerrando ? 'abertura360-saindo' : ''}`}>
      <div className="abertura360-fundo" aria-hidden="true">
        <div className="abertura360-glow abertura360-glow-1" />
        <div className="abertura360-glow abertura360-glow-2" />
        <div className="abertura360-grid" />
      </div>

      <div className="abertura360-idiomas" role="group" aria-label={idioma === 'pt' ? 'Selecionar idioma' : 'Choose language'}>
        <button type="button" lang="pt-BR" aria-pressed={idioma === 'pt'} className={idioma === 'pt' ? 'ativo' : ''} onClick={() => setIdioma('pt')}>PT</button>
        <button type="button" lang="en" aria-pressed={idioma === 'en'} className={idioma === 'en' ? 'ativo' : ''} onClick={() => setIdioma('en')}>EN</button>
      </div>

      <div className="abertura360-area">
        <div className="abertura360-personagem" aria-hidden="true">
          {frames.map((frame, indice) => (
            <img
              key={frame.src}
              src={frame.src}
              alt=""
              className={`abertura360-frame ${frame.classe} ${indice === frameAtual ? 'ativo' : ''}`}
            />
          ))}
        </div>

        <div className="abertura360-conteudo">
          <span className="abertura360-eyebrow">{t.eyebrow}</span>
          <h1>{t.titulo}</h1>
          <p className="abertura360-subtitulo">{t.subtitulo}</p>
          <p className="abertura360-descricao">{t.descricao}</p>

          <div className="abertura360-acoes">
            <span className="abertura360-dica">{t.dica}</span>
            <button type="button" className="abertura360-botao" onClick={fecharAbertura} disabled={encerrando}>
              {t.botao}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Abertura360
