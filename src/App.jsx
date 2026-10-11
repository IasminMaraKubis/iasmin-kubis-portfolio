
import { useState } from 'react'
import ProjetoModal from './ProjetoModal'
import SobreMim from './SobreMim'
import Contato from './Contato'
import Menu from './Menu'
import './App.css'

const projetos = [
  {
    numero: '01',
    titulo: 'Sistema de Gestão',
    descricao:
      'Projeto de aplicação backend com foco em organização de dados e regras de negócio.',
    tecnologias: 'Java • Spring Boot • SQL',
    status: 'Em desenvolvimento',
    icone: '⌘'
  },
  {
    numero: '02',
    titulo: 'Desenvolvimento Web',
    descricao:
      'Criação de interfaces e soluções web com foco em experiência do usuário.',
    tecnologias: 'HTML • CSS • JavaScript',
    status: 'Em preparação',
    icone: '◇'
  },
  {
    numero: '03',
    titulo: 'Próximo projeto',
    descricao:
      'Um espaço reservado para uma nova ideia que ganhará vida em breve.',
    tecnologias: 'Novas tecnologias',
    status: 'Em breve',
    icone: '✦'
  }
]

function App() {
  const [reacao, setReacao] = useState('normal')
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [projetoAberto, setProjetoAberto] = useState(null)

  function moverMouse(evento) {
    const area = evento.currentTarget.getBoundingClientRect()

    const x = (evento.clientX - area.left) / area.width - 0.5
    const y = (evento.clientY - area.top) / area.height - 0.5

    setMouse({
      x: x * 18,
      y: y * 12
    })
  }

  return (
    <main className="portfolio">
      <Menu />

      <section className="inicio" id="inicio">
        <div
          className={`camera camera-${reacao}`}
          onMouseMove={moverMouse}
          onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        >
          <img
            className="cenario"
            src="/portfolio-cenario.png"
            alt="Iasmin em seu ambiente de trabalho"
            style={{
              '--mouse-x': `${mouse.x}px`,
              '--mouse-y': `${mouse.y}px`
            }}
          />
        </div>

        <div className="controles-personagem">
          <button
            type="button"
            onClick={() => setReacao('feliz')}
          >
            💜 Olá, Iasmin!
          </button>

          <button
            type="button"
            onClick={() => setReacao('curiosa')}
          >
            ✨ O que você faz?
          </button>

          <button
            type="button"
            onClick={() => setReacao('normal')}
          >
            ↩ Voltar
          </button>
        </div>

        <a href="#projetos" className="botao-projetos">
          Explorar projetos ↓
        </a>
      </section>

      <SobreMim />

      <section className="projetos" id="projetos">
        <p className="subtitulo">MEU TRABALHO</p>

        <h2>
          Projetos<span>.</span>
        </h2>

        <p className="descricao">
          Ideias, experiências e soluções desenvolvidas
          com tecnologia.
        </p>

        <div className="cards">
          {projetos.map((projeto) => (
            <button
              type="button"
              className="card card-projeto"
              key={projeto.numero}
              onClick={() => setProjetoAberto(projeto)}
            >
              <div className="projeto-topo">
                <span className="projeto-icone">
                  {projeto.icone}
                </span>

                <span className="projeto-status">
                  {projeto.status}
                </span>
              </div>

              <span className="card-numero">
                PROJETO {projeto.numero}
              </span>

              <h3>{projeto.titulo}</h3>

              <p>{projeto.descricao}</p>

              <span className="projeto-tecnologias">
                {projeto.tecnologias}
              </span>

              <span className="projeto-ver">
                Ver detalhes →
              </span>
            </button>
          ))}
        </div>

        <a href="#inicio" className="voltar">
          ↑ Voltar ao início
        </a>
      </section>

      <Contato />

      <ProjetoModal
        projeto={projetoAberto}
        fechar={() => setProjetoAberto(null)}
      />
    </main>
  )
}

export default App
