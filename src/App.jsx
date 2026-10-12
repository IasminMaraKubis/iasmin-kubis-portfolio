import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ProjetoModal from './ProjetoModal'
import Projetos from './Projetos'
import SobreMim from './SobreMim'
import Contato from './Contato'
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
  'Conheça meus projetos! 🚀'
]
const rotas = [
  { caminho: '/', nome: 'Início' },
  { caminho: '/sobre', nome: 'Sobre mim' },
  { caminho: '/projetos', nome: 'Projetos' },
  { caminho: '/contato', nome: 'Contato' }
]

function Navegacao() {
  const [aberto, setAberto] = useState(false)
  const location = useLocation()
  useEffect(() => setAberto(false), [location.pathname])
  return (
    <header className="navegacao-topo">
      <Link to="/" className="navegacao-logo" aria-label="Iasmin Kubis, início">IK<span>.</span></Link>
      <button type="button" className="navegacao-toggle" onClick={() => setAberto(v => !v)} aria-expanded={aberto} aria-controls="navegacao-links">{aberto ? '✕' : '☰'}<span className="sr-only">Menu</span></button>
      <nav id="navegacao-links" className={`navegacao-links ${aberto ? 'abertos' : ''}`} aria-label="Páginas do portfólio">
        {rotas.map(item => <NavLink key={item.caminho} to={item.caminho} end={item.caminho === '/'} className={({ isActive }) => isActive ? 'ativo' : ''}>{item.nome}</NavLink>)}
      </nav>
    </header>
  )
}

function Inicio() {
  const navigate = useNavigate()
  const [fala, setFala] = useState('Oi! Bem-vindo ao meu universo digital. 💜')
  const [animando, setAnimando] = useState(false)
  const [piscando, setPiscando] = useState(false)
  const [sorrindo, setSorrindo] = useState(true)
  const [direcaoOlhar, setDirecaoOlhar] = useState(null)
  const [luz, setLuz] = useState({ x: 36, y: 35 })
  const tempoSorriso = useRef(null)
  const tempoPiscar = useRef(null)
  const proximoPiscar = useRef(null)
  const tempoFala = useRef(null)
  const tempoAnimacao = useRef(null)
  const indice = useRef(0)
  useEffect(() => {
    let ativo = true
    const piscar = () => {
      if (!ativo) return
      setPiscando(true)
      clearTimeout(tempoPiscar.current)
      tempoPiscar.current = setTimeout(() => setPiscando(false), 145)
      proximoPiscar.current = setTimeout(piscar, 2800 + Math.random() * 3200)
    }
    proximoPiscar.current = setTimeout(piscar, 1700)
    tempoSorriso.current = setTimeout(() => setSorrindo(false), 2300)
    tempoFala.current = setTimeout(() => setFala(''), 3800)
    return () => {
      ativo = false
      ;[tempoPiscar, proximoPiscar, tempoSorriso, tempoFala, tempoAnimacao].forEach(t => clearTimeout(t.current))
    }
  }, [])
  function reagir(texto) {
    setFala(texto)
    setSorrindo(true)
    setAnimando(false)
    clearTimeout(tempoSorriso.current)
    clearTimeout(tempoFala.current)
    clearTimeout(tempoAnimacao.current)
    requestAnimationFrame(() => setAnimando(true))
    tempoAnimacao.current = setTimeout(() => setAnimando(false), 650)
    tempoSorriso.current = setTimeout(() => setSorrindo(false), 2300)
    tempoFala.current = setTimeout(() => setFala(''), 3500)
  }
  function clicarPersonagem() {
    setPiscando(true)
    clearTimeout(tempoPiscar.current)
    tempoPiscar.current = setTimeout(() => setPiscando(false), 180)
    reagir(falas[indice.current % falas.length])
    indice.current += 1
  }
  function moverMouse(evento) {
    if (evento.pointerType !== 'mouse') return
    const b = evento.currentTarget.getBoundingClientRect()
    const x = (evento.clientX - b.left) / b.width
    const y = (evento.clientY - b.top) / b.height
    setDirecaoOlhar(x < 0.35 ? 'esquerda' : x > 0.65 ? 'direita' : null)
    setLuz({ x: x * 100, y: y * 100 })
  }
  return (
    <section className="pagina-inicio" aria-label="Início do portfólio">
      <div className={`camera camera-interativa hero-vivo ${animando ? 'personagem-reagindo' : ''}`} onPointerMove={moverMouse} onPointerLeave={() => { setDirecaoOlhar(null); setLuz({ x: 36, y: 35 }) }}>
        <img className="cenario" src="/portfolio-cenario.png" alt="Iasmin em seu ambiente de trabalho futurista" />
        <img className="olhar-personagem" src="/olhar/esquerda.png" alt="" aria-hidden="true" style={{ opacity: direcaoOlhar === 'esquerda' && !piscando ? 1 : 0 }} />
        <img className="olhar-personagem" src="/olhar/direita.png" alt="" aria-hidden="true" style={{ opacity: direcaoOlhar === 'direita' && !piscando ? 1 : 0 }} />
        <img className={`olhos-personagem ${piscando ? 'olhos-piscando' : ''}`} src="/olhos-fechados.png" alt="" aria-hidden="true" />
        <img className={`boca-personagem ${sorrindo ? 'boca-sorrindo' : ''}`} src="/boca-sorriso.png" alt="" aria-hidden="true" />
        <div className="halo-cursor" aria-hidden="true" style={{ '--luz-x': `${luz.x}%`, '--luz-y': `${luz.y}%` }} />
        <button className="area-personagem" type="button" aria-label="Interagir com Iasmin" onClick={clicarPersonagem} />
        {fala && <div className="fala-principal" role="status"><button type="button" aria-label="Fechar mensagem" onClick={() => setFala('')}>×</button>{fala}</div>}
        <div className="luz-personagem" aria-hidden="true" />
        <button className="cta-cenario cta-cenario-projetos" type="button" aria-label="Ver meus projetos" onClick={() => navigate('/projetos')} onMouseEnter={() => reagir('Te mostro meus projetos! 🚀')} />
        <button className="cta-cenario cta-cenario-contato" type="button" aria-label="Falar comigo" onClick={() => navigate('/contato')} onMouseEnter={() => reagir('Vamos conversar! 💌')} />
      </div>
      <div className="acoes-mobile"><Link to="/projetos">Ver meus projetos →</Link><Link to="/contato">Falar comigo 💜</Link></div>
      <div className="convite-explorar"><span>Explore meu universo</span><Link to="/sobre" aria-label="Conhecer Iasmin">↓</Link></div>
    </section>
  )
}

function PaginaSobre() {
  return <div className="pagina-interna"><div className="pagina-abertura"><span className="etiqueta-pagina">01 / QUEM SOU</span><h1>Além do <em>código.</em></h1><p>Uma mente curiosa, apaixonada por transformar ideias em possibilidades.</p></div><SobreMim /><div className="proxima-pagina"><span>Próxima parada</span><Link to="/projetos">Conheça meus projetos <span aria-hidden="true">↗</span></Link></div></div>
}
function PaginaProjetos() {
  return (
    <div className="pagina-interna">
      <div className="pagina-abertura">
        <span className="etiqueta-pagina">02 / O QUE CRIO</span>
        <h1>Ideias em <em>movimento.</em></h1>
        <p>Projetos, experimentos e soluções em evolução.</p>
      </div>
      <Projetos />
    </div>
  )
}
function PaginaContato() {
  return <div className="pagina-interna"><div className="pagina-abertura"><span className="etiqueta-pagina">03 / VAMOS CONVERSAR</span><h1>O próximo projeto <em>pode começar aqui.</em></h1><p>Adoro conhecer pessoas, trocar ideias e criar novas possibilidades.</p></div><Contato /><div className="proxima-pagina"><span>Voltar ao começo</span><Link to="/">Meu universo digital <span aria-hidden="true">↗</span></Link></div></div>
}
function TrocaDePagina() {
  const location = useLocation()
  const [aviso, setAviso] = useState(null)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const dados = { '/sobre': ['Prazer, vou te contar mais sobre mim. 💜', '/projetos', 'Ver projetos →'], '/projetos': ['Aqui estão as ideias que estou construindo. 🚀', '/contato', 'Vamos conversar →'], '/contato': ['Que bom que chegou até aqui! 💌', '/', 'Voltar ao início ↑'] }
    setAviso(dados[location.pathname] || null)
    const id = setTimeout(() => setAviso(null), 4500)
    return () => clearTimeout(id)
  }, [location.pathname])
  return <main className="portfolio portfolio-com-paginas"><Navegacao /><div className="troca-pagina" key={location.pathname}><Routes location={location}><Route path="/" element={<Inicio />} /><Route path="/sobre" element={<PaginaSobre />} /><Route path="/projetos" element={<PaginaProjetos />} /><Route path="/contato" element={<PaginaContato />} /><Route path="*" element={<div className="pagina-abertura"><h1>Página não encontrada.</h1><Link to="/">Voltar ao início</Link></div>} /></Routes></div>{aviso && <aside className="assistente-secao assistente-navegacao" role="status"><span className="assistente-simbolo" aria-hidden="true">✦</span><div className="assistente-texto"><strong>IASMIN KUBIS</strong><p>{aviso[0]}</p><Link className="assistente-acao" to={aviso[1]} onClick={() => setAviso(null)}>{aviso[2]}</Link></div><button type="button" className="assistente-fechar" aria-label="Fechar mensagem" onClick={() => setAviso(null)}>×</button></aside>}</main>
}
export default function App() { return <BrowserRouter><TrocaDePagina /></BrowserRouter> }
