import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useIdioma } from './Idioma'
import ProjetoModal from './ProjetoModal'
import './Projetos.css'

const projetos = [
  { numero:'01', tipo:'Backend', titulo:['Sistema de Gestão','Management System'], descricao:['Projeto pessoal de aplicação backend com foco em organização de dados e regras de negócio.','Personal backend application project focused on data organization and business logic.'], status:['Em desenvolvimento','In progress'], frase:['Da lógica à solução.','From logic to solution.'], tecnologias:'Java • Spring Boot • SQL', icone:'⌘' },
  { numero:'02', tipo:'Web', titulo:['Desenvolvimento Web','Web Development'], descricao:['Criação de interfaces e soluções web com foco na experiência do usuário.','Web interfaces and solutions focused on user experience.'], status:['Em preparação','Planned'], frase:['Interface com intenção.','Interfaces with purpose.'], tecnologias:'HTML • CSS • JavaScript', icone:'◇' },
  { numero:'03', tipo:'Ideias', titulo:['Próximo projeto','Next project'], descricao:['Um espaço reservado para uma nova ideia que ganhará vida em breve.','Space for an upcoming idea that is yet to take shape.'], status:['Em breve','Coming soon'], frase:['O melhor ainda vem.','More to come.'], tecnologias:'Novas tecnologias / New technologies', icone:'✦' }
]
export default function Projetos() {
  const { en } = useIdioma()
  const [filtro, setFiltro] = useState('Todos')
  const [projetoAberto, setProjetoAberto] = useState(null)
  const index = en ? 1 : 0
  const categorias = ['Todos','Backend','Web','Ideias']
  const visiveis = filtro === 'Todos' ? projetos : projetos.filter(item => item.tipo === filtro)
  return <section className="vitrine" aria-labelledby="vitrine-titulo" id="projetos">
    <div className="vitrine__cabecalho"><div><span className="vitrine__tag">{en ? 'MY DIGITAL LAB / 001' : 'MEU LABORATÓRIO DIGITAL / 001'}</span><h2 id="vitrine-titulo">{en ? <>Always <em>building.</em></> : <>Em constante <em>construção.</em></>}</h2><p>{en ? 'Code, experimentation, and ideas taking shape. Explore what I’m building.' : 'Código, experimentação e ideias ganhando forma. Explore o que estou desenvolvendo e o que vem pela frente.'}</p></div><div className="vitrine__contador"><strong>03</strong><span>{en ? 'project ideas' : 'ideias na vitrine'}</span></div></div>
    <div className="vitrine__filtros" role="group" aria-label={en ? 'Filter projects' : 'Filtrar projetos'}>{categorias.map((nome,i) => <button key={nome} type="button" aria-pressed={filtro===nome} className={filtro===nome ? 'vitrine__filtro vitrine__filtro--ativo' : 'vitrine__filtro'} onClick={() => setFiltro(nome)}>{en ? ['All','Backend','Web','Ideas'][i] : nome}</button>)}</div>
    <div className="vitrine__grade" aria-live="polite">{visiveis.map((projeto,i) => <button key={projeto.numero} type="button" className="vitrine__card" onClick={() => setProjetoAberto({ numero: projeto.numero, titulo: projeto.titulo[index], descricao: projeto.descricao[index], tecnologias: projeto.tecnologias, status: projeto.status[index], icone: projeto.icone })} style={{'--item':i}} aria-label={`${projeto.titulo[index]}: ${projeto.status[index]}`}><span className="vitrine__card-topo"><span>IK / {projeto.numero}</span><span className="vitrine__status"><i aria-hidden="true" />{projeto.status[index]}</span></span><span className="vitrine__simbolo" aria-hidden="true">{projeto.icone}</span><span className="vitrine__card-tipo">{en && projeto.tipo==='Ideias' ? 'IDEAS' : projeto.tipo.toUpperCase()}</span><span className="vitrine__card-titulo">{projeto.titulo[index]}</span><span className="vitrine__card-frase">{projeto.frase[index]}</span><span className="vitrine__card-texto">{projeto.descricao[index]}</span><span className="vitrine__card-base"><span>{projeto.tecnologias}</span><span className="vitrine__seta" aria-hidden="true">↗</span></span></button>)}</div>
    <div className="vitrine__final"><div><span>{en ? 'NEXT IDEA' : 'PRÓXIMA IDEIA'}</span><h3>{en ? <>Maybe we can build something <em>together.</em></> : <>Talvez a gente crie algo <em>juntos.</em></>}</h3></div><Link to="/contato">{en ? 'Let’s talk' : 'Vamos conversar'} <span aria-hidden="true">↗</span></Link></div>
    <div className="vitrine__final vitrine__experiencia"><div><span>{en ? 'REAL-WORLD EXPERIENCE' : 'EXPERIÊNCIA REAL'}</span><h3>{en ? 'Beyond personal projects.' : 'Além dos projetos pessoais.'}</h3><p>{en ? 'Hands-on experience building payment API integrations, connecting real-estate listings between websites, developing responsive interfaces, and testing real solutions.' : 'Experiência prática programando integrações com APIs de pagamento, conectando anúncios de imóveis entre websites, desenvolvendo interfaces responsivas e testando soluções reais.'}</p></div></div>
    <ProjetoModal projeto={projetoAberto} fechar={() => setProjetoAberto(null)} />
  </section>
}
