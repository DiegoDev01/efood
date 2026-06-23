import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { theme } from './styles/theme'
import { GlobalStyle } from './styles/global'
import { AppRoutes } from './routes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App