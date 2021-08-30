import { useEffect, useMemo, useState } from "react"
import ReactDOM from 'react-dom'

export const Portal = ({ children, el = null }) => {
  const anchorEl = useMemo(() => {
    if (typeof window === 'undefined') return null
    return el || document.body
  }, [el])

  if (!anchorEl) return null
  return <NoSSR>
    {
      ReactDOM.createPortal(children, anchorEl)
    }
  </NoSSR>
}


export const NoSSR = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    if (!showChildren) setShowChildren(true)
  }, [])

  if (!showChildren) return null
  return children
}