import React, { useContext } from 'react'

interface ThemeContext {
  colors: { [key: string]: any }
}

const colorMap = {
  primary: '#FF881F',
  secondary: '#984C16',
  tertiary: '#F6F0EB',
  text: {
    highlight: '#984C16'
  }
}

const ThemeContext = React.createContext<ThemeContext>({
  colors: colorMap
})


export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider: React.FC = ({ children }) => {
  return <ThemeContext.Provider value={{
    colors: colorMap
  }}>
    {children}
  </ThemeContext.Provider>
}