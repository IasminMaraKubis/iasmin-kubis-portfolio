import { useEffect, useRef, useState } from 'react'
import ProjetoModal from './ProjetoModal'
import SobreMim from './SobreMim'
import Contato from './Contato'
import Menu from './Menu'
import './App.css'

const projetos = [
  { numero: '01', titulo: 'Sistema de Gestão', descricao: 'Projeto de aplicação backend com foco em organização de dados e regras de negócio.', tecnologias: 'Java • Spring Boot • SQL', status: 'Em desenvolvimento', icone: '⌘' },
  { numero: '02', titulo: 'Desenvolvimento Web', descricao: 'Criação de interfaces e soluções web com foco em experiência do usuário.', tecnologias: 'HTML • CSS • JavaScript', status: 'Em preparação', icone: '◇' },
  { numero: '03', titulo: 'Próximo projeto', descricao: 'Um espaço reservado para uma nova ideia que ganhará vida em breve.', tecnologias: 'Novas tecnologias', status: 'Em breve', icone: '✦' }
]

const falas = [
  'Oi! Que bom ter você por aqui! 💜',
  'Sou desenvolvedora Java e estudo Engenharia de Software. ✨',
  'Adoro transformar ideias em tecnologia! 💻',
  'Conheça meus projetos logo abaixo! 🚀'
]

function App() {
  const [projetoAberto, setProjetoAberto] = useState(null)
  const [fala, setFala] = useState('')
  const [animando, setAnimando] = useState(false)
  const [piscando, setPiscando] = useState(false)
  const [sorrindo, setSorrindo] = useState(false)
  const [direcaoOlhar, setDirecaoOlhar] = useState(null)
  const [avisoSecao, setAvisoSecao] = useState(null)

  const tempoSorriso = useRef(null)
  const tempoPiscar = useRef(null)
  const proximoPiscar = useRef(null)
  const indice = useRef(0)
  const tempoFala = useRef(null)
  const tempoAnimacao = useRef(null)
  const tempoAviso = useRef(null)

  useEffect(() => {
    let ativo = true
    function piscar() {
      if (!ativo) return
      setPiscando(true)
      clearTimeout(tempoPiscar.current)
      tempoPiscar.current = setTimeout(() => setPiscando(false), 145)
      proximoPiscar.current = setTimeout(piscar, 2800 + Math.random() * 3200)
    }
    proximoPiscar.current = setTimeout(piscar, 1700)
    return () => {
      ativo = false
      clearTimeout(tempoPiscar.current)
      clearTimeout(proximoPiscar.current)
    }
  }, [])

  useEffect(() => () => {
    clearTimeout(tempoFala.current)
    clearTimeout(tempoAnimacao.current)
    clearTimeout(tempoSorriso.current)
    clearTimeout(tempoAviso.current)
  }, [])

  function moverMouse(evento) {
    if (evento.pointerType !== 'mouse') return
    const bounds = evento.currentTarget.getBoundingClientRect()
    const x = (evento.clientX - bounds.left) / bounds.width
    setDirecaoOlhar(x < 0.35 ? 'esquerda' : x > 0.65 ? 'direita' : null)
  }

  function reagir(texto) {
    setSorrindo(true)
    clearTimeout(tempoSorriso.current)
    tempoSorriso.current = setTimeout(() => setSorrindo(false), 2300)

    setFala(texto)
    setAnimando(false)
    clearTimeout(tempoFala.current)
    clearTimeout(tempoAnimacao.current)
    requestAnimationFrame(() => setAnimando(true))
    tempoAnimacao.current = setTimeout(() => setAnimando(false), 650)
    tempoFala.current = setTimeout(() => setFala(''), 3500)
  }

  function clicarPersonagem() {
    setPiscando(true)
    clearTimeout(tempoPiscar.current)
    tempoPiscar.current = setTimeout(() => setPiscando(false), 180)
    reagir(falas[indice.current % falas.length])
    indice.current += 1
  }

  // Mensagens das seções aparecem na posição atual da página, não no topo.
  useEffect(() => {
    const secoes = [
      { seletor: '#sobre, .sobre', titulo: 'Sobre mim', mensagem: 'Prazer! Vou te contar um pouquinho sobre mim. 💜', destino: '#projetos', acao: 'Ver projetos →' },
      { seletor: '#projetos', titulo: 'Projetos', mensagem: 'Aqui você pode conhecer meus projetos! 🚀', destino: '#contato', acao: 'Ir para contato →' },
      { seletor: '#contato, .contato', titulo: 'Contato', mensagem: 'Gostou do meu trabalho? Vamos conversar! 💌', destino: '#inicio', acao: 'Voltar ao início ↑' }
    ]
    const visitadas = new Set()
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue
        const info = secoes.find((item) => document.querySelector(item.seletor) === entrada.target)
        if (!info || visitadas.has(info.seletor)) continue
        visitadas.add(info.seletor)
        setAvisoSecao({ titulo: info.titulo, mensagem: info.mensagem, destino: info.destino, acao: info.acao })
        clearTimeout(tempoAviso.current)
        tempoAviso.current = setTimeout(() => setAvisoSecao(null), 4500)
      }
    }, { threshold: 0.15 })

    secoes.forEach(({ seletor }) => {
      const elemento = document.querySelector(seletor)
      if (elemento) observador.observe(elemento)
    })
    return () => {
      observador.disconnect()
      clearTimeout(tempoAviso.current)
    }
  }, [])

  return (
    <main className="portfolio">
      <Menu />
      <section className="inicio" id="inicio">
        <div
          className={`camera camera-interativa ${animando ? 'personagem-reagindo' : ''}`}
          onPointerMove={moverMouse}
          onPointerLeave={() => setDirecaoOlhar(null)}
        >
          <img className="cenario" src="/portfolio-cenario.png" alt="Iasmin em seu ambiente de trabalho" />
          <img className="olhar-personagem" src="/olhar/esquerda.png" alt="" aria-hidden="true"
            style={{ opacity: direcaoOlhar === 'esquerda' && !piscando ? 1 : 0 }} />
          <img className="olhar-personagem" src="/olhar/direita.png" alt="" aria-hidden="true"
            style={{ opacity: direcaoOlhar === 'direita' && !piscando ? 1 : 0 }} />
          <img className={`olhos-personagem ${piscando ? 'olhos-piscando' : ''}`}
            src="/olhos-fechados.png" alt="" aria-hidden="true" />
          <img className={`boca-personagem ${sorrindo ? 'boca-sorrindo' : ''}`}
            src="/boca-sorriso.png" alt="" aria-hidden="true" />
          <button className="area-personagem" type="button" aria-label="Conversar com a personagem" onClick={clicarPersonagem} />
          {fala && (
            <div className="fala-principal" role="status" aria-live="polite">
              <button type="button" aria-label="Fechar mensagem" onClick={() => setFala('')}>×</button>
              {fala}
            </div>
          )}
          <div className="luz-personagem" aria-hidden="true" />
        </div>
        <div className="controles-personagem">
          <button type="button" onClick={() => reagir('Oi! Que bom ter você aqui! 💜')}>💜 Olá, Iasmin!</button>
          <button type="button" onClick={() => reagir('Sou desenvolvedora Java e estudo Engenharia de Software. ✨')}>✨ O que você faz?</button>
          <button type="button" onClick={() => { setFala(''); setSorrindo(false) }}>↩ Voltar</button>
        </div>
        <a href="#projetos" className="botao-projetos" onMouseEnter={() => reagir('Vem conhecer meus projetos! 🚀')}>
          Explorar projetos ↓
        </a>
      </section>
      <SobreMim />
      <section className="projetos" id="projetos">
        <p className="subtitulo">MEU TRABALHO</p>
        <h2>Projetos<span>.</span></h2>
        <p className="descricao">Ideias, experiências e soluções desenvolvidas com tecnologia.</p>
        <div className="cards">
          {projetos.map((projeto) => (
            <button type="button" className="card card-projeto" key={projeto.numero} onClick={() => setProjetoAberto(projeto)}>
              <div className="projeto-topo">
                <span className="projeto-icone">{projeto.icone}</span>
                <span className="projeto-status">{projeto.status}</span>
              </div>
              <span className="card-numero">PROJETO {projeto.numero}</span>
              <h3>{projeto.titulo}</h3>
              <p>{projeto.descricao}</p>
              <span className="projeto-tecnologias">{projeto.tecnologias}</span>
              <span className="projeto-ver">Ver detalhes →</span>
            </button>
          ))}
        </div>
        <a href="#inicio" className="voltar">↑ Voltar ao início</a>
      </section>
      <Contato />
      {avisoSecao && !projetoAberto && (
        <aside className="assistente-secao" role="status" aria-live="polite">
          <span className="assistente-simbolo" aria-hidden="true">✦</span>
          <div className="assistente-texto">
            <strong>{avisoSecao.titulo}</strong>
            <p>{avisoSecao.mensagem}</p>
            <a href={avisoSecao.destino} className="assistente-acao" onClick={() => { clearTimeout(tempoAviso.current); setAvisoSecao(null) }}>{avisoSecao.acao}</a>
          </div>
          <button
            type="button"
            className="assistente-fechar"
            aria-label="Fechar mensagem"
            onClick={() => { clearTimeout(tempoAviso.current); setAvisoSecao(null) }}
          >×</button>
        </aside>
      )}
      <ProjetoModal projeto={projetoAberto} fechar={() => setProjetoAberto(null)} />
    </main>
  )
}

export default App
