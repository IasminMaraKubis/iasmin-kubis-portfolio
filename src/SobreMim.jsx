import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useIdioma } from './Idioma'
import './SobreMim.css'

const tecnologias = [
  ['Java', 'Minha base para criar aplicações e regras de negócio.', 'My foundation for building applications and business logic.'],
  ['Spring Boot', 'APIs e aplicações backend organizadas.', 'APIs and well-structured backend applications.'],
  ['SQL', 'Dados estruturados, consultas e persistência.', 'Structured data, queries, and persistence.'],
  ['Git', 'Versionamento para evoluir projetos com segurança.', 'Version control to develop projects safely.'],
  ['React', 'Interfaces interativas, como este portfólio.', 'Interactive interfaces, including this portfolio.'],
  ['Desenvolvimento Web', 'Soluções e interfaces web responsivas.', 'Responsive web interfaces and solutions.']
]
export default function SobreMim() {
  const { en } = useIdioma()
  const [ativa, setAtiva] = useState(0)
  return <section className="sobre sobre-experiencia" id="sobre" aria-labelledby="sobre-titulo">
    <div className="sobre-experiencia__grade">
      <div className="sobre-experiencia__conteudo">
        <p className="subtitulo sobre-experiencia__tag">{en ? '01 / BEHIND THE CODE' : '01 / POR TRÁS DO CÓDIGO'}</p>
        <h1 id="sobre-titulo" className="sobre-experiencia__titulo">{en ? <>Technology with <em>personality.</em></> : <>Tecnologia com <em>identidade.</em></>}</h1>
        <p className="sobre-experiencia__abertura">{en ? 'Hi, I’m Iasmin. I enjoy turning ideas into solutions that make sense — inside and out.' : 'Oi, eu sou a Iasmin. Gosto de transformar ideias em soluções que fazem sentido — por dentro e por fora.'}</p>
        <p className="sobre-experiencia__texto">{en ? 'I study Software Engineering and work on websites, responsive interfaces, API integrations, and functional testing. My interests include Java, Spring Boot, backend development, and creative web experiences.' : 'Sou estudante de Engenharia de Software e tenho experiência com websites, interfaces responsivas, integração de APIs e testes funcionais. Meus interesses incluem Java, Spring Boot, backend e experiências digitais criativas.'}</p>
        <p className="sobre-experiencia__texto">{en ? 'My work includes programming API requests, connecting services, improving mobile interfaces, and testing features. I am also improving my English through private lessons.' : 'Na prática, programei chamadas de API, integrei serviços, desenvolvi interfaces para celular e realizei testes de funcionalidades. Também estudo inglês em aulas particulares.'}</p>
        <div className="sobre-experiencia__acoes"><Link className="sobre-experiencia__botao" to="/projetos">{en ? 'Explore my projects' : 'Explorar meus projetos'} <span aria-hidden="true">↗</span></Link><Link className="sobre-experiencia__link" to="/contato">{en ? 'Get in touch' : 'Vamos conversar'} <span aria-hidden="true">→</span></Link></div>
      </div>
      <div className="sobre-experiencia__painel">
        <div className="sobre-experiencia__painel-topo"><span className="sobre-experiencia__ponto"/> {en ? 'EXPLORE MY SKILLS' : 'EXPLORAR MINHAS TECNOLOGIAS'} <span>✦</span></div>
        <p className="sobre-experiencia__instrucao">{en ? 'Select a technology to see how it fits into my work.' : 'Clique em uma tecnologia e descubra onde ela entra no meu trabalho.'}</p>
        <div className="sobre-experiencia__chips" role="group" aria-label={en ? 'Technologies' : 'Tecnologias'}>{tecnologias.map((item, i) => <button key={item[0]} type="button" className={`sobre-experiencia__chip ${ativa===i ? 'sobre-experiencia__chip--ativo' : ''}`} aria-pressed={ativa===i} onClick={() => setAtiva(i)}>{item[0]}</button>)}</div>
        <div className="sobre-experiencia__resposta" key={ativa} aria-live="polite"><span className="sobre-experiencia__resposta-numero">0{ativa+1} / 0{tecnologias.length}</span><h2>{tecnologias[ativa][0]}</h2><p>{tecnologias[ativa][en ? 2 : 1]}</p></div>
        <div className="sobre-experiencia__rodape">{en ? 'ALWAYS LEARNING' : 'EM CONSTANTE EVOLUÇÃO'} <span aria-hidden="true">✧</span></div>
      </div>
      <div className="experiencia-destaque" aria-labelledby="experiencia-titulo">
        <div className="experiencia-destaque__cabecalho">
          <p className="subtitulo">{en ? 'EXPERIENCE / REAL-WORLD WORK' : 'EXPERIÊNCIA / TRABALHO REAL'}</p>
          <h2 id="experiencia-titulo">{en ? <>From interface to integration: <em>real solutions.</em></> : <>Da interface à integração: <em>soluções reais.</em></>}</h2>
          <p>{en ? 'Hands-on experience developing and maintaining websites, integrating services, testing features, and working with client requirements.' : 'Experiência prática no desenvolvimento e manutenção de websites, integração de serviços, testes e atendimento às necessidades de clientes.'}</p>
        </div>
        <div className="experiencia-destaque__cards">
          {[
            { icon: '⌘', titulo: en ? 'APIs & integrations' : 'APIs e integrações', texto: en ? 'Implemented API requests and integrations with payment services, including functional testing.' : 'Programação de chamadas de API e integração com serviços de pagamento, incluindo testes funcionais.' },
            { icon: '▣', titulo: en ? 'Responsive interfaces' : 'Interfaces responsivas', texto: en ? 'Developed and adapted website interfaces for mobile devices.' : 'Desenvolvimento e adaptação de interfaces de websites para dispositivos móveis.' },
            { icon: '↗', titulo: en ? 'System connectivity' : 'Integração entre sistemas', texto: en ? 'Connected web platforms to exchange and display information.' : 'Integração de plataformas web para comunicação e apresentação de informações.' },
            { icon: '✓', titulo: en ? 'Testing & client work' : 'Testes e demandas de clientes', texto: en ? 'Validated features, implemented improvements, and collaborated on client requests.' : 'Validação de funcionalidades, implementação de melhorias e acompanhamento de demandas de clientes.' }
          ].map(item => (
            <article className="experiencia-destaque__card" key={item.titulo}>
              <span className="experiencia-destaque__icone" aria-hidden="true">{item.icon}</span>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
}
