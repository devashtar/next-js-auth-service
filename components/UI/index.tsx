import { darkTheme, lightTheme } from './Themes'
import React, { useState, useEffect } from 'react'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import globalStore from '@store/Global.store'
import { observer } from 'mobx-react-lite'

const prefix = process.env.PUBLIC_URL || ''

export const CustomThemeProvider: React.FC = observer(({ children }) => {
  const [theme, setTheme] = useState(createTheme(lightTheme))
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (!load) return
    setTheme(createTheme(globalStore.isDark ? darkTheme : lightTheme))
  }, [load, globalStore.isDark])

  useEffect(() => {
    const isDarkRecord = localStorage.getItem('themeMode') as string | null
    globalStore.setIsDarkMode(!!isDarkRecord)
    setTheme(createTheme(!!isDarkRecord ? darkTheme : lightTheme))
    setLoad(true)
  }, [])

  const styles = {
    width: '100%',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    backgroundImage: `url(${prefix}/images/${
      globalStore.isDark ? 'bg-dark.jpg' : 'bg-light.jpg'
    })`
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={styles}>{children}</div>
    </ThemeProvider>
  )
})
