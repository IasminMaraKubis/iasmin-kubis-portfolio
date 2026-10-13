import Abertura360 from './Abertura360'

import { useEffect, useRef, useState } from 'react'

import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { IdiomaProvider, useIdioma } from './Idioma'

import Projetos from './Projetos'

import SobreMim from './SobreMim'

import Contato from './Contato'

import './App.css'



const textos = {

  pt: {

    menu: ['Início', 'Sobre mim', 'Projetos', 'Contato'], menuLabel: 'Abrir menu', home: 'Início',

    welcome: 'Oi! Bem-vindo ao meu universo digital. 💜',

    falas: ['Oi! Que bom ter você por aqui! 💜', 'Sou desenvolvedora de software e estudo Engenharia de Software. ✨', 'Já trabalhei com integrações de APIs e interfaces responsivas. 💻', 'Conheça meus projetos! 🚀'],

    projects: 'Ver meus projetos', contact: 'Falar comigo', explore: 'Explore meu universo',

    heroEyebrow: 'OLÁ, EU SOU', heroRole: 'Desenvolvedora de Software', heroStatement: 'Transformo ideias em experiências digitais com identidade.', heroTech: 'Java · Spring Boot · APIs · Desenvolvimento Web', heroMobileTitle: 'Código, criatividade e personalidade.',

    projectsHint: 'Te mostro meus projetos! 🚀', contactHint: 'Vamos conversar! 💌',

    sobreTop: '01 / QUEM SOU', sobreTitle: ['Além do ', 'código.'], sobreDesc: 'Desenvolvimento, criatividade e experiência com soluções utilizadas por clientes.',

    projetosTop: '02 / O QUE CRIO', projetosTitle: ['Ideias em ', 'movimento.'], projetosDesc: 'Integrações reais, interfaces web e projetos em evolução.',

    contatoTop: '03 / VAMOS CONVERSAR', contatoTitle: ['O próximo projeto ', 'pode começar aqui.'], contatoDesc: 'Adoro conhecer pessoas, trocar ideias e criar novas possibilidades.',

    next: 'Próxima parada', nextProjects: 'Conheça meus projetos', backLabel: 'Voltar ao começo', back: 'Meu universo digital',

    brand: 'IASMIN · INTERATIVA ✦', react: 'Interagir com Iasmin',

    versoes: {

      sobre: ['Muito além do código', 'Curiosidade é o que me move. Explore minhas tecnologias! ✨', 'Prazer! Aqui você conhece um pouco mais sobre mim. 💜'],

      projetos: ['Cada ideia tem uma história', 'Escolha um projeto para descobrir o que estou construindo. 🚀', 'Encontrou algo interessante? Vamos conversar! 💻'],

      contato: ['Uma conversa pode criar algo incrível', 'Tem uma ideia? Quero ouvir você! 💌', 'Adoro conhecer pessoas e transformar ideias em projetos! ✨']

    },

    talk: 'Conversar', backStart: 'Voltar ao início', notFound: 'Página não encontrada.',

    toast: {

      '/sobre': ['Prazer, vou te contar mais sobre mim. 💜', '/projetos', 'Ver projetos →'],

      '/projetos': ['Aqui estão as ideias que estou construindo. 🚀', '/contato', 'Vamos conversar →'],

      '/contato': ['Que bom que chegou até aqui! 💌', '/', 'Voltar ao início ↑']

    }

  },

  en: {

    menu: ['Home', 'About', 'Projects', 'Contact'], menuLabel: 'Open menu', home: 'Home',

    welcome: 'Hi! Welcome to my digital universe. 💜',

    falas: ['Hi! So glad you are here! 💜', 'I am a software developer studying Software Engineering. ✨', 'I have worked with API integrations and responsive interfaces. 💻', 'Take a look at my projects! 🚀'],

    projects: 'View my projects', contact: 'Get in touch', explore: 'Explore my universe',

    heroEyebrow: 'HI, I’M', heroRole: 'Software Developer', heroStatement: 'I turn ideas into distinctive digital experiences.', heroTech: 'Java · Spring Boot · APIs · Web Development', heroMobileTitle: 'Code, creativity and personality.',

    projectsHint: 'Let me show you my projects! 🚀', contactHint: 'Let’s talk! 💌',

    sobreTop: '01 / ABOUT ME', sobreTitle: ['Beyond the ', 'code.'], sobreDesc: 'Development, creativity, and hands-on experience with real-world web solutions.',

    projetosTop: '02 / WHAT I BUILD', projetosTitle: ['Ideas in ', 'motion.'], projetosDesc: 'Real-world integrations, web interfaces, and projects in progress.',

    contatoTop: '03 / LET’S TALK', contatoTitle: ['The next project ', 'could start here.'], contatoDesc: 'I love meeting people, exchanging ideas, and building new possibilities.',

    next: 'Up next', nextProjects: 'Explore my projects', backLabel: 'Back to the beginning', back: 'My digital universe',

    brand: 'IASMIN · INTERACTIVE ✦', react: 'Interact with Iasmin',

    versoes: {

      sobre: ['Beyond code', 'Curiosity drives me. Explore the technologies I use! ✨', 'Nice to meet you! Get to know me here. 💜'],

      projetos: ['Every idea has a story', 'Choose a project to see what I am building. 🚀', 'Found something interesting? Let’s talk! 💻'],

      contato: ['A conversation can spark something great', 'Have an idea? I would love to hear it! 💌', 'I enjoy meeting people and turning ideas into projects! ✨']

    },

    talk: 'Let’s talk', backStart: 'Back to home', notFound: 'Page not found.',

    toast: {

      '/sobre': ['Let me tell you a bit about myself. 💜', '/projetos', 'View projects →'],

      '/projetos': ['Here are the ideas I am working on. 🚀', '/contato', 'Get in touch →'],

      '/contato': ['Glad you made it this far! 💌', '/', 'Back to home ↑']

    }

  }

}

function useTexto() { const { idioma } = useIdioma(); return textos[idioma] }



const rotas = ['/', '/sobre', '/projetos', '/contato']

function Navegacao() {

  const { idioma, setIdioma } = useIdioma()

  const t = useTexto()

  const [aberto, setAberto] = useState(false)

  const location = useLocation()

  useEffect(() => setAberto(false), [location.pathname])

  return <header className="navegacao-topo">

    <Link to="/" className="navegacao-logo" aria-label={`Iasmin Kubis — ${t.home}`}>IK<span>.</span></Link>

    <nav id="navegacao-links" className={`navegacao-links ${aberto ? 'abertos' : ''}`} aria-label="Portfolio">

      {rotas.map((path, i) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => isActive ? 'ativo' : ''}>{t.menu[i]}</NavLink>)}

    </nav>

    <div className="navegacao-direita">

      <div className="seletor-idioma" role="group" aria-label={idioma === 'pt' ? 'Idioma' : 'Language'}>

        <button type="button" lang="pt-BR" aria-pressed={idioma === 'pt'} onClick={() => setIdioma('pt')}>PT</button>

        <button type="button" lang="en" aria-pressed={idioma === 'en'} onClick={() => setIdioma('en')}>EN</button>

      </div>

      <button type="button" className="navegacao-toggle" aria-label={t.menuLabel} onClick={() => setAberto(v => !v)} aria-expanded={aberto} aria-controls="navegacao-links">{aberto ? '✕' : '☰'}</button>

    </div>

  </header>

}



function Inicio() {

  const t = useTexto()

  const navigate = useNavigate()

  const [fala, setFala] = useState(t.welcome)

  const [animando, setAnimando] = useState(false)

  const [piscando, setPiscando] = useState(false)

  const [sorrindo, setSorrindo] = useState(true)

  const [direcaoOlhar, setDirecaoOlhar] = useState(null)

  const [luz, setLuz] = useState({ x: 36, y: 35 })

  const timers = useRef([])

  const clique = useRef(0)

  function programar(fn, ms) { const id = setTimeout(fn, ms); timers.current.push(id); return id }

  useEffect(() => {

    let ativo = true

    const piscar = () => {

      if (!ativo) return

      setPiscando(true)

      programar(() => setPiscando(false), 145)

      programar(piscar, 2800 + Math.random() * 3200)

    }

    programar(piscar, 1700)

    programar(() => setSorrindo(false), 2300)

    programar(() => setFala(''), 3800)

    return () => { ativo = false; timers.current.forEach(clearTimeout); timers.current = [] }

  }, [])

  function reagir(texto) {

    setFala(texto); setSorrindo(true); setAnimando(true)

    programar(() => setSorrindo(false), 2300)

    programar(() => setAnimando(false), 650)

    programar(() => setFala(''), 3500)

  }

  function clicar() {

    setPiscando(true); programar(() => setPiscando(false), 180)

    reagir(t.falas[clique.current % t.falas.length]); clique.current += 1

  }

  function moverMouse(evento) {

    if (evento.pointerType !== 'mouse') return

    const bounds = evento.currentTarget.getBoundingClientRect()

    const x = (evento.clientX - bounds.left) / bounds.width

    const y = (evento.clientY - bounds.top) / bounds.height

    setDirecaoOlhar(x < .35 ? 'esquerda' : x > .65 ? 'direita' : null)

    setLuz({ x: x * 100, y: y * 100 })

  }

  return <section className="pagina-inicio" aria-label={t.home}>


    <div className={`camera camera-interativa hero-vivo ${animando ? 'personagem-reagindo' : ''}`} onPointerMove={moverMouse} onPointerLeave={() => { setDirecaoOlhar(null); setLuz({ x:36, y:35 }) }}>

      <img className="cenario" src="/portfolio-cenario.png" alt={t.welcome} />

      <img className="olhar-personagem" src="/olhar/esquerda.png" alt="" aria-hidden="true" style={{ opacity: direcaoOlhar === 'esquerda' && !piscando ? 1 : 0 }} />

      <img className="olhar-personagem" src="/olhar/direita.png" alt="" aria-hidden="true" style={{ opacity: direcaoOlhar === 'direita' && !piscando ? 1 : 0 }} />

      <img className={`olhos-personagem ${piscando ? 'olhos-piscando' : ''}`} src="/olhos-fechados.png" alt="" aria-hidden="true" />

      <img className={`boca-personagem ${sorrindo ? 'boca-sorrindo' : ''}`} src="/boca-sorriso.png" alt="" aria-hidden="true" />

      <div className="halo-cursor" aria-hidden="true" style={{ '--luz-x': `${luz.x}%`, '--luz-y': `${luz.y}%` }} />

      <div className="hero-texto-traduzido">

        <span className="hero-texto-traduzido__intro">{t.heroEyebrow}</span>

        <h1>IASMIN <span>KUBIS.</span></h1>

        <h2>{t.heroRole}</h2>

        <p>{t.heroStatement}</p>

        <div className="hero-texto-traduzido__links">

          <Link to="/projetos" onMouseEnter={() => reagir(t.projectsHint)}>{t.projects} <span aria-hidden="true">↗</span></Link>

          <Link to="/contato" onMouseEnter={() => reagir(t.contactHint)}>{t.contact} <span aria-hidden="true">↗</span></Link>

        </div>

        <span className="hero-texto-traduzido__tech">{t.heroTech}</span>

      </div>

      <button className="area-personagem" type="button" aria-label={t.react} onClick={clicar} />

      {fala && <div className="fala-principal" role="status"><button type="button" aria-label="Close" onClick={() => setFala('')}>×</button>{fala}</div>}

      <div className="luz-personagem" aria-hidden="true" />

    </div>

    <div className="inicio-mobile-conteudo">

      <span className="etiqueta-pagina">IASMIN KUBIS · {t.heroRole}</span>

      <h1>{t.heroMobileTitle}</h1>

      <p>{t.heroStatement}</p>

      <div className="acoes-mobile"><Link to="/projetos">{t.projects} →</Link><Link to="/contato">{t.contact} ↗</Link></div>

      <button type="button" className="inicio-mobile-interagir" onClick={clicar}>{t.react} ✦</button>

    </div>

    <div className="convite-explorar"><span>{t.explore}</span><Link to="/sobre" aria-label={t.menu[1]}>↓</Link></div>

  </section>

}



const poses = {

  sobre: ['/personagem-versoes/curiosa.webp', '/personagem-versoes/boas-vindas.webp'],

  projetos: ['/personagem-versoes/projetos.webp', '/personagem-versoes/pisca.webp'],

  contato: ['/personagem-versoes/contato.webp', '/personagem-versoes/interage.webp']

}

function PersonagemNasPaginas({ pagina }) {

  const t = useTexto()

  const navigate = useNavigate()

  const [reagindo, setReagindo] = useState(false)

  const [fala, setFala] = useState('')

  const timer = useRef(null)

  const respostas = t.versoes[pagina]

  function reagir() {

    setReagindo(true); setFala(respostas[2]); clearTimeout(timer.current)

    timer.current = setTimeout(() => { setReagindo(false); setFala('') }, 2300)

  }

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {

    const seletores = {

      sobre: '.sobre-experiencia__chip',

      projetos: '.vitrine__card, .vitrine__filtro',

      contato: '.contato-experiencia__opcao'

    }

    function ouvirClique(evento) {

      if (evento.target.closest?.(seletores[pagina])) {

        setReagindo(true)

        clearTimeout(timer.current)

        timer.current = setTimeout(() => setReagindo(false), 1400)

      }

    }

    document.addEventListener('click', ouvirClique)

    return () => document.removeEventListener('click', ouvirClique)

  }, [pagina])

  return <aside className={`personagem-cena personagem-cena--${pagina}`} aria-label={t.react}>

    <div className="personagem-cena__figura">

      <img className={`personagem-cena__pose ${reagindo ? 'personagem-cena__pose--oculta' : ''}`} src={poses[pagina][0]} alt="" />

      <img className={`personagem-cena__pose personagem-cena__pose--reacao ${reagindo ? 'personagem-cena__pose--ativa' : ''}`} src={poses[pagina][1]} alt="" aria-hidden="true" />

      <button type="button" className="personagem-cena__interagir" onClick={reagir} aria-label={t.react} />

    </div>

    <div className="personagem-cena__texto" aria-live="polite">

      <span className="personagem-cena__assinatura">{t.brand}</span><strong>{respostas[0]}</strong><p>{fala || respostas[1]}</p>

      <div className="personagem-cena__acoes">

        {pagina !== 'projetos' && <button type="button" onClick={() => navigate('/projetos')}>{t.projects} ↗</button>}

        {pagina !== 'contato' && <button type="button" onClick={() => navigate('/contato')}>{t.talk} ↗</button>}

        {pagina === 'contato' && <button type="button" onClick={() => navigate('/')}>{t.backStart} ↗</button>}

      </div>

    </div>

  </aside>

}

function RodapeNavegacao({ destino, legenda, texto }) {

  return (

    <footer className="proxima-pagina">

      <Link className="proxima-pagina__link" to={destino}>

        <span className="proxima-pagina__legenda">{legenda}</span>

        <span className="proxima-pagina__titulo">{texto} <span aria-hidden="true">↗</span></span>

      </Link>

    </footer>

  )

}

function PaginaSobre() { const t = useTexto(); return <div className="pagina-interna"><div className="pagina-abertura pagina-abertura-viva"><div className="pagina-abertura__texto"><span className="etiqueta-pagina">{t.sobreTop}</span><h1>{t.sobreTitle[0]}<em>{t.sobreTitle[1]}</em></h1><p>{t.sobreDesc}</p></div><PersonagemNasPaginas pagina="sobre" /></div><SobreMim /><RodapeNavegacao destino="/projetos" legenda={t.next} texto={t.nextProjects} /></div> }

function PaginaProjetos() { const t = useTexto(); return <div className="pagina-interna"><div className="pagina-abertura pagina-abertura-viva"><div className="pagina-abertura__texto"><span className="etiqueta-pagina">{t.projetosTop}</span><h1>{t.projetosTitle[0]}<em>{t.projetosTitle[1]}</em></h1><p>{t.projetosDesc}</p></div><PersonagemNasPaginas pagina="projetos" /></div><Projetos /><RodapeNavegacao destino="/contato" legenda={t.next} texto={t.contact} /></div> }

function PaginaContato() { const t = useTexto(); return <div className="pagina-interna"><div className="pagina-abertura pagina-abertura-viva"><div className="pagina-abertura__texto"><span className="etiqueta-pagina">{t.contatoTop}</span><h1>{t.contatoTitle[0]}<em>{t.contatoTitle[1]}</em></h1><p>{t.contatoDesc}</p></div><PersonagemNasPaginas pagina="contato" /></div><Contato /><RodapeNavegacao destino="/" legenda={t.backLabel} texto={t.back} /></div> }

function TrocaDePagina() {

  const { idioma } = useIdioma()
  const [mostrarAbertura, setMostrarAbertura] = useState(() =>
    sessionStorage.getItem('abertura360-iasmin') !== 'ok'
  )

  function fecharAbertura() {
    sessionStorage.setItem('abertura360-iasmin', 'ok')
    setMostrarAbertura(false)
  }

  const t = useTexto()

  const location = useLocation()

  const [aviso, setAviso] = useState(null)

  useEffect(() => {

    window.scrollTo(0, 0)

    setAviso(t.toast[location.pathname] || null)

    const timer = setTimeout(() => setAviso(null), 4500)

    return () => clearTimeout(timer)

  }, [location.pathname, t])

  return <main className="portfolio portfolio-com-paginas">
    {mostrarAbertura && <Abertura360 idioma={idioma} onFinish={fecharAbertura} />}
    <Navegacao /><div className="troca-pagina" key={location.key}><Routes location={location}><Route path="/" element={<Inicio />} /><Route path="/sobre" element={<PaginaSobre />} /><Route path="/projetos" element={<PaginaProjetos />} /><Route path="/contato" element={<PaginaContato />} /><Route path="*" element={<div className="pagina-abertura"><h1>{t.notFound}</h1><Link to="/">{t.backStart}</Link></div>} /></Routes></div>{aviso && <aside className="assistente-secao assistente-navegacao" role="status"><span className="assistente-simbolo" aria-hidden="true">✦</span><div className="assistente-texto"><strong>IASMIN KUBIS</strong><p>{aviso[0]}</p><Link className="assistente-acao" to={aviso[1]} onClick={() => setAviso(null)}>{aviso[2]}</Link></div><button type="button" className="assistente-fechar" aria-label="Close" onClick={() => setAviso(null)}>×</button></aside>}</main>

}

export default function App() { return <IdiomaProvider><BrowserRouter><TrocaDePagina /></BrowserRouter></IdiomaProvider> }
