
import { useEffect } from 'react'

export default function ProjetoModal({ projeto, fechar }) {
  useEffect(() => {
    if (!projeto) return

    function aoPressionarTecla(evento) {
      if (evento.key === 'Escape') fechar()
    }

    document.addEventListener('keydown', aoPressionarTecla)

    return () => {
      document.removeEventListener('keydown', aoPressionarTecla)
    }
  }, [projeto, fechar])

  if (!projeto) return null

  return (
    <div
      className="modal-fundo"
      onClick={fechar}
    >
      <div
        className="modal-conteudo"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button
          className="modal-fechar"
          onClick={fechar}
          aria-label="Fechar janela"
        >
          ×
        </button>

        <span className="card-numero">
          {projeto.numero}
        </span>

        <h2 id="modal-titulo">
          {projeto.titulo}
        </h2>

        <p>{projeto.descricao}</p>

        <p className="modal-tecnologias">
          {projeto.tecnologias}
        </p>
      </div>
    </div>
  )
}
