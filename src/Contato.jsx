import { useState } from 'react'
import './Contato.css'

// Coloque seu e-mail aqui quando quiser habilitar o botão de enviar.
const EMAIL_CONTATO = ''
const GITHUB = 'https://github.com/IasminMaraKubis'

const assuntos = [
  { id: 'projeto', titulo: 'Tenho uma ideia', emoji: '✦', descricao: 'Vamos transformar uma ideia em algo real.' },
  { id: 'oportunidade', titulo: 'Uma oportunidade', emoji: '⌘', descricao: 'Uma vaga, parceria ou desafio interessante.' },
  { id: 'conversa', titulo: 'Quero conversar', emoji: '♡', descricao: 'Trocar experiências também faz parte.' }
]

export default function Contato() {
  const [assunto, setAssunto] = useState('projeto')
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [erro, setErro] = useState('')

  const assuntoAtual = assuntos.find(item => item.id === assunto)
  const texto = `Olá, Iasmin!\n\n${mensagem.trim()}\n\n${nome.trim() ? `Abraços,\n${nome.trim()}` : 'Até mais!'}`
  const destinoEmail = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(`Portfólio | ${assuntoAtual.titulo}`)}&body=${encodeURIComponent(texto)}`

  async function copiarMensagem() {
    if (!mensagem.trim()) {
      setErro('Escreva uma mensagem antes de copiar.')
      return
    }
    setErro('')
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 2800)
    } catch {
      setErro('Seu navegador não permitiu copiar. Selecione o texto para copiar manualmente.')
    }
  }

  function enviarEmail() {
    if (!mensagem.trim()) {
      setErro('Escreva uma mensagem antes de enviar.')
      return
    }
    setErro('')
    window.location.href = destinoEmail
  }

  return (
    <section className="contato-experiencia" id="contato" aria-labelledby="contato-experiencia-titulo">
      <div className="contato-experiencia__intro">
        <span className="contato-experiencia__eyebrow"><span aria-hidden="true">✳</span> CONEXÃO ESTABELECIDA</span>
        <h2 id="contato-experiencia-titulo">Toda boa ideia começa com um <em>olá.</em></h2>
        <p>Me conte o que você tem em mente. Escolha um assunto e monte uma mensagem — simples, sem formulários que somem no espaço.</p>
      </div>

      <div className="contato-experiencia__layout">
        <div className="contato-experiencia__painel">
          <div className="contato-experiencia__painel-cabecalho">
            <span><span className="contato-experiencia__indicador" /> CANAL ABERTO</span>
            <span>01 — 03</span>
          </div>
          <h3>Qual é o motivo da visita?</h3>
          <div className="contato-experiencia__opcoes" role="group" aria-label="Assunto da mensagem">
            {assuntos.map(item => (
              <button className={`contato-experiencia__opcao ${assunto === item.id ? 'contato-experiencia__opcao--ativa' : ''}`} type="button" key={item.id} aria-pressed={assunto === item.id} onClick={() => { setAssunto(item.id); setErro('') }}>
                <span className="contato-experiencia__emoji" aria-hidden="true">{item.emoji}</span>
                <span><strong>{item.titulo}</strong><small>{item.descricao}</small></span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="contato-experiencia__github">Explorar meu GitHub <span aria-hidden="true">↗</span></a>
        </div>

        <div className="contato-experiencia__editor">
          <div className="contato-experiencia__editor-cabecalho"><span>✦ SUA MENSAGEM</span><span>PRONTA PARA ENVIAR</span></div>
          <label htmlFor="contato-nome">Como posso chamar você?</label>
          <input id="contato-nome" value={nome} maxLength={80} onChange={e => setNome(e.target.value)} placeholder="Seu nome (opcional)" autoComplete="name" />
          <label htmlFor="contato-mensagem">O que vamos conversar?</label>
          <textarea id="contato-mensagem" rows={6} maxLength={2000} value={mensagem} onChange={e => { setMensagem(e.target.value); setErro(''); setCopiado(false) }} placeholder={assunto === 'projeto' ? 'Tenho uma ideia e gostaria de conversar sobre...' : assunto === 'oportunidade' ? 'Quero conversar com você sobre uma oportunidade...' : 'Oi, Iasmin! Passei pelo seu portfólio e...'} />
          <div className="contato-experiencia__contador">{mensagem.length} / 2000 caracteres</div>
          {erro && <p className="contato-experiencia__erro" role="alert">{erro}</p>}
          <div className="contato-experiencia__acoes">
            {EMAIL_CONTATO ? (
              <button type="button" onClick={enviarEmail} className="contato-experiencia__principal">Abrir no e-mail <span aria-hidden="true">↗</span></button>
            ) : (
              <button type="button" onClick={copiarMensagem} className="contato-experiencia__principal">{copiado ? 'Mensagem copiada ✓' : 'Copiar mensagem'} <span aria-hidden="true">↗</span></button>
            )}
            <span>{EMAIL_CONTATO ? 'Abre o aplicativo de e-mail do visitante.' : 'Copie e envie pelo canal que preferir.'}</span>
          </div>
        </div>
      </div>
      <p className="contato-experiencia__rodape">FEITO COM CÓDIGO, CURIOSIDADE E PERSONALIDADE <span aria-hidden="true">✳</span></p>
    </section>
  )
}
