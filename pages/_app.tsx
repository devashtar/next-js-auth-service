import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CustomThemeProvider } from '@components/UI'
import CssBaseline from '@mui/material/CssBaseline'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </CustomThemeProvider>
  )
}

export default MyApp
