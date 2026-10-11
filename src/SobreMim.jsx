
export default function SobreMim() {
  const tecnologias = [
    'Java',
    'Spring Boot',
    'SQL',
    'Git',
    'Maven',
    'Docker',
    'APIs REST',
    'Desenvolvimento Web'
  ]

  return (
    <section className="sobre" id="sobre">
      <div className="sobre-conteudo">
        <div className="sobre-texto">
          <p className="subtitulo">QUEM SOU EU</p>

          <h2>
            Muito prazer,<br />
            <span>sou a Iasmin.</span>
          </h2>

          <p>
            Sou desenvolvedora Java e estudante de
            Engenharia de Software, apaixonada por
            transformar ideias em soluções digitais.
          </p>

          <p>
            Trabalho com desenvolvimento e gerenciamento
            de websites e estou aprimorando meus
            conhecimentos em backend, APIs REST e
            boas práticas de engenharia de software.
          </p>

          <a href="#projetos" className="sobre-botao">
            Conheça meus projetos →
          </a>
        </div>

        <div className="sobre-tecnologias">
          <h3>Meu universo tecnológico</h3>

          <div className="tecnologias-grid">
            {tecnologias.map((tecnologia) => (
              <span
                className="tecnologia"
                key={tecnologia}
              >
                {tecnologia}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
