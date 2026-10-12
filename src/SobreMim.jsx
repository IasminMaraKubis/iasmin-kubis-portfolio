import { useState } from 'react'
import './SobreMim.css'

const tecnologias = [
  { nome: 'Java', detalhe: 'Minha base para criar aplicações e regras de negócio.' },
  { nome: 'Spring Boot', detalhe: 'APIs e aplicações backend organizadas e escaláveis.' },
  { nome: 'SQL', detalhe: 'Dados estruturados, consultas e persistência.' },
  { nome: 'Git', detalhe: 'Versionamento para evoluir projetos com segurança.' },
  { nome: 'React', detalhe: 'Interfaces interativas, como este portfólio.' },
  { nome: 'Desenvolvimento Web', detalhe: 'Experiências que conectam design e código.' }
]

export default function SobreMim() {
  const [ativa, setAtiva] = useState(0)

  return (
    <section className="sobre sobre-experiencia" id="sobre" aria-labelledby="sobre-titulo">
      <div className="sobre-experiencia__grade">
        <div className="sobre-experiencia__conteudo">
          <p className="subtitulo sobre-experiencia__tag">01 / POR TRÁS DO CÓDIGO</p>
          <h1 id="sobre-titulo" className="sobre-experiencia__titulo">
            Tecnologia com <em>identidade.</em>
          </h1>
          <p className="sobre-experiencia__abertura">
            Oi, eu sou a Iasmin. Gosto de transformar ideias em soluções que fazem sentido —
            por dentro e por fora.
          </p>
          <p className="sobre-experiencia__texto">
            Sou desenvolvedora Java e estudante de Engenharia de Software. Meu foco é
            desenvolvimento backend, APIs e banco de dados, mas também gosto de explorar
            interfaces e experiências digitais criativas.
          </p>
          <p className="sobre-experiencia__texto">
            Este portfólio é parte dessa busca: unir lógica, aprendizado e um toque de
            personalidade em cada detalhe.
          </p>
          <div className="sobre-experiencia__acoes">
            <a className="sobre-experiencia__botao" href="/projetos">Explorar meus projetos <span aria-hidden="true">↗</span></a>
            <a className="sobre-experiencia__link" href="/contato">Vamos conversar <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <div className="sobre-experiencia__painel">
          <div className="sobre-experiencia__painel-topo"><span className="sobre-experiencia__ponto"/> EXPLORAR MINHAS TECNOLOGIAS <span>✦</span></div>
          <p className="sobre-experiencia__instrucao">Clique em uma tecnologia e descubra onde ela entra no meu trabalho.</p>
          <div className="sobre-experiencia__chips" role="group" aria-label="Tecnologias">
            {tecnologias.map((item, i) => (
              <button
                key={item.nome}
                type="button"
                className={`sobre-experiencia__chip ${ativa === i ? 'sobre-experiencia__chip--ativo' : ''}`}
                aria-pressed={ativa === i}
                onClick={() => setAtiva(i)}
              >
                {item.nome}
              </button>
            ))}
          </div>
          <div className="sobre-experiencia__resposta" key={ativa} aria-live="polite">
            <span className="sobre-experiencia__resposta-numero">0{ativa + 1} / 0{tecnologias.length}</span>
            <h2>{tecnologias[ativa].nome}</h2>
            <p>{tecnologias[ativa].detalhe}</p>
          </div>
          <div className="sobre-experiencia__rodape">EM CONSTANTE EVOLUÇÃO <span aria-hidden="true">✧</span></div>
        </div>
      </div>
    </section>
  )
}
