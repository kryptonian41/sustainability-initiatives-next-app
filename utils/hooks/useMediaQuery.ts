import { useThemeContext } from "components/ThemeProvider"
import { useEffect, useMemo, useRef, useState } from "react"

export const useMediaQuery = (query: string) => {
  const [mediaQuery, setQuery] = useState(typeof window === 'undefined' && query ? null : window.matchMedia(query))
  const [matches, setMatches] = useState<boolean>(null)

  useEffect(() => {
    if (!query) return
    const mq = window.matchMedia(query)
    setQuery(mq)
    setMatches(mq.matches)
  }, [query])

  useEffect(() => {
    if (!mediaQuery) return
    const eventHandler = (event) => setMatches(event.matches)
    mediaQuery.addEventListener('change', eventHandler)
    return () => mediaQuery.removeEventListener('change', eventHandler)
  }, [mediaQuery])

  return { matches }
}

const generateMediaQuery = ({ minWidth = 0, maxWidth = 0 } = {}) => {
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
      return generateMediaQuery({ maxWidth: tablet })
    }
    case 'tablet': {
      return generateMediaQuery({ minWidth: tablet })
    }
    case 'laptop': {
      return generateMediaQuery({ minWidth: laptop })
    }
    case 'desktop': {
      return generateMediaQuery({ minWidth: desktop })
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

const calculateBreakpointValue = (valueMap, mediaMatchMap) => {
  const mediaMatchSequence = ['desktop', 'laptop', 'tablet', 'phone']
  for (const deviceSize of mediaMatchSequence) {
    if (mediaMatchMap[deviceSize] && valueMap[deviceSize]) {
      return valueMap[deviceSize]
    }
  }
}

export const useBreakpointValue = (map, initialValue = null) => {
  const matchesPhone = useDeviceMediaQuery('phone')
  const matchesTablet = useDeviceMediaQuery('tablet')
  const matcheslaptop = useDeviceMediaQuery('laptop')
  const matchesDesktop = useDeviceMediaQuery('desktop')

  const namedMatchList = useMemo(() => {
    return {
      'phone': matchesPhone,
      'tablet': matchesTablet,
      'laptop': matcheslaptop,
      'desktop': matchesDesktop,
    }
  }, [matchesPhone, matchesTablet, matcheslaptop, matchesDesktop])

  const [value, setValue] = useState(calculateBreakpointValue(map, namedMatchList) || initialValue)

  useEffect(() => {
    setValue(calculateBreakpointValue(map, namedMatchList))
  }, [namedMatchList])

  return value
}