
import { useState } from 'react'

export default function Menu() {
  const [aberto, setAberto] = useState(false)

  const links = [
    { nome: 'Início', destino: '#inicio' },
    { nome: 'Sobre mim', destino: '#sobre' },
    { nome: 'Projetos', destino: '#projetos' },
    { nome: 'Contato', destino: '#contato' }
  ]

  return (
    <header className="menu">
      <a
        href="#inicio"
        className="menu-logo"
        onClick={() => setAberto(false)}
      >
        IK<span>.</span>
      </a>

      <button
        type="button"
        className="menu-toggle"
        aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={aberto}
        aria-controls="menu-links"
        onClick={() => setAberto(!aberto)}
      >
        {aberto ? '✕' : '☰'}
      </button>

      <nav
        id="menu-links"
        className={`menu-links ${aberto ? 'menu-aberto' : ''}`}
        aria-label="Navegação principal"
      >
        {links.map((link) => (
          <a
            key={link.destino}
            href={link.destino}
            onClick={() => setAberto(false)}
          >
            {link.nome}
          </a>
        ))}
      </nav>
    </header>
  )
}
