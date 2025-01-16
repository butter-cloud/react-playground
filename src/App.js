import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import {
  GlobalStyles,
  lightTheme,
  MeetingProvider,
} from 'amazon-chime-sdk-component-library-react'
import { ThemeProvider } from 'styled-components'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <MeetingProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MeetingProvider>
    </ThemeProvider>
  )
}

export default App
