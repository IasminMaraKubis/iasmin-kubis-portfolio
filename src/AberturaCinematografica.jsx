import { useEffect, useState } from 'react'
import { useIdioma } from './Idioma'
import './AberturaCinematografica.css'

const CHAVE = 'iasmin-intro-v1'

export default function AberturaCinematografica() {
  const { idioma } = useIdioma()
  const [ativa, setAtiva] = useState(false)

  useEffect(() => {
    let jaVista = false
    try { jaVista = sessionStorage.getItem(CHAVE) === 'sim' } catch { /* modo privado */ }
    const reduzir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (jaVista || reduzir) return
    setAtiva(true)
    const id = window.setTimeout(() => {
      try { sessionStorage.setItem(CHAVE, 'sim') } catch { /* modo privado */ }
      setAtiva(false)
    }, 2300)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!ativa) return
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = anterior }
  }, [ativa])

  function pular() {
    try { sessionStorage.setItem(CHAVE, 'sim') } catch { /* modo privado */ }
    setAtiva(false)
  }

  if (!ativa) return null

  return (
    <div className="abertura-ik" role="dialog" aria-modal="true" aria-label={idioma === 'en' ? 'Welcome to my portfolio' : 'Boas-vindas ao meu portfólio'}>
      <div className="abertura-ik__luz" aria-hidden="true" />
      <div className="abertura-ik__conteudo">
        <span className="abertura-ik__prefixo">{idioma === 'en' ? 'WELCOME TO MY UNIVERSE' : 'BEM-VINDO AO MEU UNIVERSO'}</span>
        <div className="abertura-ik__nome">IASMIN <span>KUBIS.</span></div>
        <p>{idioma === 'en' ? 'Code. Creativity. Personality.' : 'Código. Criatividade. Personalidade.'}</p>
        <div className="abertura-ik__linha" aria-hidden="true"><span /></div>
      </div>
      <button className="abertura-ik__pular" type="button" autoFocus onClick={pular}>
        {idioma === 'en' ? 'Enter now ↗' : 'Entrar agora ↗'}
      </button>
    </div>
  )
}
