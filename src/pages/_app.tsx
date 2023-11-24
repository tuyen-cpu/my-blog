import '@/styles/globals.css'
import { CssBaseline, FormControlLabel, GlobalStyles, PaletteMode, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { themeDesign } from '@/utils/theme'
import Head from 'next/head'

import { createTheme, styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import DarkModeButton from '@/components/Button/DarkModeButton'
import { useMemo, useState } from 'react'
import { Header } from '@/components/Common/Header'

export default function App({ Component, pageProps }: AppProps) {
  pageProps.appTuyen = "appTuyen"
  console.log("app",pageProps)
  const [mode, setMode] = useState<PaletteMode>('dark')
  // const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = useMemo(() => {
    return () => {
      setMode((prevMode: PaletteMode) => prevMode === 'light' ? 'dark' : 'light');
    };
  }, []);
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(themeDesign(mode)), [mode])
  return (
    <>
      <Head>
        <title>MY-BLOG</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              // background: 'linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%)',
            },
          }}
        />
        <Header mode={mode} handleThemeChange={handleThemeChange}></Header>
          {/*<DarkModeButton mode={mode} onThemeChange={handleThemeChange} />*/}
          <Component {...pageProps} mode={mode} handleThemeChange={handleThemeChange} />
      </ThemeProvider>
    </>
  )
}
