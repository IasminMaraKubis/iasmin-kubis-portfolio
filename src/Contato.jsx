import { useState } from 'react'
import { useIdioma } from './Idioma'
import './Contato.css'

const EMAIL_CONTATO = '' // Adicione seu endereço quando quiser habilitar o e-mail.
const GITHUB = 'https://github.com/IasminMaraKubis'
const assuntos = [
  { id:'projeto', emoji:'✦', pt:['Tenho uma ideia','Vamos transformar uma ideia em algo real.'], en:['I have an idea','Let’s turn an idea into something real.'] },
  { id:'oportunidade', emoji:'⌘', pt:['Uma oportunidade','Uma vaga, parceria ou desafio interessante.'], en:['An opportunity','A role, collaboration, or interesting challenge.'] },
  { id:'conversa', emoji:'♡', pt:['Quero conversar','Trocar experiências também faz parte.'], en:['Let’s talk','Sharing experiences is part of the journey.'] }
]
export default function Contato() {
  const { en } = useIdioma()
  const lang = en ? 'en' : 'pt'
  const [assunto,setAssunto] = useState('projeto')
  const [nome,setNome] = useState('')
  const [mensagem,setMensagem] = useState('')
  const [copiado,setCopiado] = useState(false)
  const [erro,setErro] = useState('')
  const atual = assuntos.find(item => item.id === assunto)
  const texto = `${en ? 'Hello' : 'Olá'}, Iasmin!\n\n${mensagem.trim()}\n\n${nome.trim() || (en ? 'Best regards' : 'Até mais')}`
  const mailto = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(`Portfolio | ${atual[lang][0]}`)}&body=${encodeURIComponent(texto)}`
  async function copiar() {
    if (!mensagem.trim()) { setErro(en ? 'Write a message before copying.' : 'Escreva uma mensagem antes de copiar.'); return }
    setErro('')
    try { await navigator.clipboard.writeText(texto); setCopiado(true); setTimeout(() => setCopiado(false), 2800) }
    catch { setErro(en ? 'Could not copy automatically. Please select and copy your message.' : 'Não foi possível copiar. Selecione e copie sua mensagem.') }
  }
  return <section className="contato-experiencia" id="contato" aria-labelledby="contato-experiencia-titulo">
    <div className="contato-experiencia__intro"><span className="contato-experiencia__eyebrow"><span aria-hidden="true">✳</span> {en ? 'CONNECTION ESTABLISHED' : 'CONEXÃO ESTABELECIDA'}</span><h2 id="contato-experiencia-titulo">{en ? <>Every great idea starts with <em>hello.</em></> : <>Toda boa ideia começa com um <em>olá.</em></>}</h2><p>{en ? 'Tell me what is on your mind. Choose a topic and write a message.' : 'Me conte o que você tem em mente. Escolha um assunto e monte uma mensagem.'}</p></div>
    <div className="contato-experiencia__layout"><div className="contato-experiencia__painel"><div className="contato-experiencia__painel-cabecalho"><span><span className="contato-experiencia__indicador" /> {en ? 'OPEN CHANNEL' : 'CANAL ABERTO'}</span><span>01 — 03</span></div><h3>{en ? 'What brings you here?' : 'Qual é o motivo da visita?'}</h3>
      <div className="contato-experiencia__opcoes" role="group" aria-label={en ? 'Message topic' : 'Assunto da mensagem'}>{assuntos.map(item => <button className={`contato-experiencia__opcao ${assunto===item.id ? 'contato-experiencia__opcao--ativa' : ''}`} type="button" key={item.id} aria-pressed={assunto===item.id} onClick={() => { setAssunto(item.id); setErro('') }}><span className="contato-experiencia__emoji" aria-hidden="true">{item.emoji}</span><span><strong>{item[lang][0]}</strong><small>{item[lang][1]}</small></span><span aria-hidden="true">↗</span></button>)}</div>
      <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="contato-experiencia__github">{en ? 'Explore my GitHub' : 'Explorar meu GitHub'} <span aria-hidden="true">↗</span></a>
    </div><div className="contato-experiencia__editor"><div className="contato-experiencia__editor-cabecalho"><span>{en ? '✦ YOUR MESSAGE' : '✦ SUA MENSAGEM'}</span><span>{en ? 'READY TO SHARE' : 'PRONTA PARA ENVIAR'}</span></div>
      <label htmlFor="contato-nome">{en ? 'What should I call you?' : 'Como posso chamar você?'}</label><input id="contato-nome" value={nome} maxLength={80} onChange={e => setNome(e.target.value)} placeholder={en ? 'Your name (optional)' : 'Seu nome (opcional)'} autoComplete="name" />
      <label htmlFor="contato-mensagem">{en ? 'What would you like to discuss?' : 'O que vamos conversar?'}</label><textarea id="contato-mensagem" rows={6} maxLength={2000} value={mensagem} onChange={e => { setMensagem(e.target.value); setErro(''); setCopiado(false) }} placeholder={en ? 'Hi, Iasmin! I visited your portfolio and...' : 'Oi, Iasmin! Passei pelo seu portfólio e...'} /><div className="contato-experiencia__contador">{mensagem.length} / 2000 {en ? 'characters' : 'caracteres'}</div>
      {erro && <p className="contato-experiencia__erro" role="alert">{erro}</p>}
      <div className="contato-experiencia__acoes">{EMAIL_CONTATO ? <a href={mailto} className="contato-experiencia__principal">{en ? 'Open email app' : 'Abrir no e-mail'} ↗</a> : <button type="button" onClick={copiar} className="contato-experiencia__principal">{copiado ? (en ? 'Copied ✓' : 'Mensagem copiada ✓') : (en ? 'Copy message' : 'Copiar mensagem')} ↗</button>}<span>{EMAIL_CONTATO ? (en ? 'Opens your email app.' : 'Abre seu aplicativo de e-mail.') : (en ? 'Copy and send through your preferred channel.' : 'Copie e envie pelo canal que preferir.')}</span></div>
    </div></div><p className="contato-experiencia__rodape">{en ? 'BUILT WITH CODE, CURIOSITY, AND PERSONALITY' : 'FEITO COM CÓDIGO, CURIOSIDADE E PERSONALIDADE'} <span aria-hidden="true">✳</span></p>
  </section>
}
