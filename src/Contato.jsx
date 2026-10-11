
export default function Contato() {
  return (
    <section className="contato" id="contato">
      <p className="subtitulo">VAMOS CONVERSAR?</p>

      <h2>
        Vamos criar algo <span>incrível.</span>
      </h2>

      <p className="contato-descricao">
        Tem uma ideia, um projeto ou uma oportunidade?
        Adoraria conversar sobre tecnologia e novas possibilidades.
      </p>

      <div className="contato-links">
        <a
          href="https://github.com/IasminMaraKubis"
          target="_blank"
          rel="noopener noreferrer"
          className="contato-link"
        >
          <span>GitHub</span>
          <span>↗</span>
        </a>

        <a
          href="https://www.linkedin.com/in/iasmin-mara-kubis"
          target="_blank"
          rel="noopener noreferrer"
          className="contato-link"
        >
          <span>LinkedIn</span>
          <span>↗</span>
        </a>

        <a
          href="mailto:yasminkubis2010@hotmail.com"
          className="contato-link"
        >
          <span>E-mail</span>
          <span>↗</span>
        </a>
      </div>

      <footer className="rodape">
        <p>© {new Date().getFullYear()} Iasmin Kubis</p>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
    </section>
  )
}
