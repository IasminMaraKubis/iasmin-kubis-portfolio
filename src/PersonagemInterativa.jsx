
import { useEffect, useRef, useState } from 'react'

export default function PersonagemInterativa() {
  const [piscando, setPiscando] = useState(false)
  const tempoPiscada = useRef(null)

  function piscar() {
    setPiscando(true)

    clearTimeout(tempoPiscada.current)

    tempoPiscada.current = setTimeout(() => {
      setPiscando(false)
    }, 250)
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      setPiscando(true)

      clearTimeout(tempoPiscada.current)

      tempoPiscada.current = setTimeout(() => {
        setPiscando(false)
      }, 250)
    }, 3500)

    return () => {
      clearInterval(intervalo)
      clearTimeout(tempoPiscada.current)
    }
  }, [])

  return (
    <button
      className="personagem-interativa"
      onClick={piscar}
      aria-label="Fazer a personagem piscar"
    >
      <img
        src={
          piscando
            ? '/iasmin-piscando.png'
            : '/iasmin-normal.png'
        }
        alt=""
      />
    </button>
  )
}
