import { createContext, useContext, useEffect, useState } from 'react'

const IdiomaContexto = createContext(null)

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState(() => {
    try {
      const salvo = localStorage.getItem('ik-idioma')
      if (salvo === 'pt' || salvo === 'en') return salvo
    } catch { /* Navegação privada */ }
    return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
  })
  useEffect(() => {
    document.documentElement.lang = idioma === 'pt' ? 'pt-BR' : 'en'
    try { localStorage.setItem('ik-idioma', idioma) } catch { /* Navegação privada */ }
  }, [idioma])
  return <IdiomaContexto.Provider value={{ idioma, setIdioma, en: idioma === 'en' }}>{children}</IdiomaContexto.Provider>
}
export function useIdioma() {
  const valor = useContext(IdiomaContexto)
  if (!valor) throw new Error('useIdioma precisa de IdiomaProvider')
  return valor
}
