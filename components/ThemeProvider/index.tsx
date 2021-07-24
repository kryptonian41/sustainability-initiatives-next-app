import React, { useContext } from 'react'

interface ThemeContext {
  colors: { [key: string]: any },
  font: { [key: string]: any },

}

const colorMap = {
  primary: '#FF881F',
  secondary: '#984C16',
  tertiary: '#F6F0EB',
  text: {
    highlight: '#984C16',
    dark: '#411B00',
    light: '#CB9A76'
  },
  background: {
    primary: '#fff',
    secondary: '#F7F0EB',
  }
}

const fontMap = {
  primary: 'Montserrat',
  secondary: 'Begum',
}

const ThemeContext = React.createContext<ThemeContext>({
  colors: colorMap,
  font: fontMap
})


export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider: React.FC = ({ children }) => {
  return <ThemeContext.Provider value={{
    colors: colorMap,
    font: fontMap,
  }}>
    {children}
  </ThemeContext.Provider>
}