import { useThemeContext } from "components/ThemeProvider"
import { useEffect, useRef, useState } from "react"

export const useMediaQuery = (query: string) => {
  console.log("🚀 ~ file: useMediaQuery.ts ~ line 4 ~ useMediaQuery ~ query", query)
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

const generateRangeMediaQuery = ({ minWidth = 0, maxWidth = 0 } = {}) => {
  let query = ""
  if (minWidth) query += `(min-width: ${minWidth}px)`
  if (minWidth && maxWidth) query += ' and '
  if (maxWidth) query += `(max-width: ${maxWidth}px)`
  return query
}

const getDeviceQuery = (deviceName, breakpoints) => {
  const { phone, tablet, laptop, desktop } = breakpoints
  switch (deviceName) {
    case 'phone': {
      return generateRangeMediaQuery({ maxWidth: tablet, minWidth: phone })
    }
    case 'tablet': {
      return generateRangeMediaQuery({ maxWidth: laptop, minWidth: tablet })
    }
    case 'laptop': {
      return generateRangeMediaQuery({ maxWidth: desktop, minWidth: laptop })
    }
    case 'desktop': {
      return generateRangeMediaQuery({ minWidth: desktop })
    }
    default: {
      return null
    }
  }
}

export const useDeviceMediaQuery = (deviceName) => {
  const { breakpoints } = useThemeContext()
  const { matches } = useMediaQuery(getDeviceQuery(deviceName, breakpoints))
  return matches
}