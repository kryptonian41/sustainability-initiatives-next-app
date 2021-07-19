import TailwindStylesProvider from './TailwindStylesProvider'
import { ThemeProvider } from '../components/ThemeProvider'
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


export const decorators = [
  (Story) => (
    <ThemeProvider>
      <TailwindStylesProvider>
        <Story />
      </TailwindStylesProvider>
    </ThemeProvider>
  ),
];