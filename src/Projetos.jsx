import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjetoModal from './ProjetoModal'
import './Projetos.css'

const projetos = [
  { numero: '01', titulo: 'Sistema de Gestão', descricao: 'Projeto de aplicação backend com foco em organização de dados e regras de negócio.', tecnologias: 'Java • Spring Boot • SQL', status: 'Em desenvolvimento', icone: '⌘', tipo: 'Backend', frase: 'Da lógica à solução.' },
  { numero: '02', titulo: 'Desenvolvimento Web', descricao: 'Criação de interfaces e soluções web com foco em experiência do usuário.', tecnologias: 'HTML • CSS • JavaScript', status: 'Em preparação', icone: '◇', tipo: 'Web', frase: 'Interface com intenção.' },
  { numero: '03', titulo: 'Próximo projeto', descricao: 'Um espaço reservado para uma nova ideia que ganhará vida em breve.', tecnologias: 'Novas tecnologias', status: 'Em breve', icone: '✦', tipo: 'Ideias', frase: 'O melhor ainda vem.' }
]

const filtros = ['Todos', 'Backend', 'Web', 'Ideias']

export default function Projetos() {
  const [filtro, setFiltro] = useState('Todos')
  const [projetoAberto, setProjetoAberto] = useState(null)
  const visiveis = filtro === 'Todos' ? projetos : projetos.filter(item => item.tipo === filtro)

  return (
    <section className="vitrine" aria-labelledby="vitrine-titulo" id="projetos">
      <div className="vitrine__cabecalho">
        <div>
          <span className="vitrine__tag">MEU LABORATÓRIO DIGITAL / 001</span>
          <h2 id="vitrine-titulo">Em constante <em>construção.</em></h2>
          <p>Código, experimentação e ideias ganhando forma. Explore o que estou desenvolvendo e o que vem pela frente.</p>
        </div>
        <div className="vitrine__contador" aria-label="Três espaços de projeto"><strong>03</strong><span>ideias na vitrine</span></div>
      </div>

      <div className="vitrine__filtros" role="group" aria-label="Filtrar projetos">
        {filtros.map(nome => <button key={nome} type="button" aria-pressed={filtro === nome} className={filtro === nome ? 'vitrine__filtro vitrine__filtro--ativo' : 'vitrine__filtro'} onClick={() => setFiltro(nome)}>{nome}</button>)}
      </div>

      <div className="vitrine__grade" aria-live="polite">
        {visiveis.map((projeto, indice) => (
          <button key={projeto.numero} type="button" className="vitrine__card" onClick={() => setProjetoAberto(projeto)} style={{ '--item': indice }} aria-label={`Conhecer ${projeto.titulo}: ${projeto.status}`}>
            <span className="vitrine__card-topo"><span>IK / {projeto.numero}</span><span className="vitrine__status"><i aria-hidden="true" />{projeto.status}</span></span>
            <span className="vitrine__simbolo" aria-hidden="true">{projeto.icone}</span>
            <span className="vitrine__card-tipo">{projeto.tipo.toUpperCase()}</span>
            <span className="vitrine__card-titulo">{projeto.titulo}</span>
            <span className="vitrine__card-frase">{projeto.frase}</span>
            <span className="vitrine__card-texto">{projeto.descricao}</span>
            <span className="vitrine__card-base"><span>{projeto.tecnologias}</span><span className="vitrine__seta" aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>

      <div className="vitrine__final">
        <div><span>PRÓXIMA IDEIA</span><h3>Talvez a gente crie algo <em>juntos.</em></h3></div>
        <Link to="/contato">Vamos conversar <span aria-hidden="true">↗</span></Link>
      </div>
      <ProjetoModal projeto={projetoAberto} fechar={() => setProjetoAberto(null)} />
    </section>
  )
}
