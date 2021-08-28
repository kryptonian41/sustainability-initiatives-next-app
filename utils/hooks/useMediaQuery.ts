import { useEffect, useRef, useState } from "react"

export const useMediaQuery = (query: string) => {
  const [mediaQuery, setQuery] = useState(typeof window === 'undefined' ? null : window.matchMedia(query))
  const [matches, setMatches] = useState<boolean>()

  useEffect(() => {
    const mq = window.matchMedia(query)
    setQuery(mq)
    setMatches(mq.matches)
  }, [query])

  useEffect(() => {
    const eventHandler = (event) => {
      setMatches(event.matches)
    }
    mediaQuery.addEventListener('change', eventHandler)
    return () => mediaQuery.removeEventListener('change', eventHandler)
  }, [mediaQuery])

  return { matches }
}