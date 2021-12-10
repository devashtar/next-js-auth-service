import { PaletteMode } from '@mui/material'
import { grey } from '@mui/material/colors'

const baseTheme = {
  typography: {
    fontFamily: [
      'sans-serif',
      'Noto Sans',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
}

export const darkTheme = {
  ...baseTheme,
  palette: {
    background: {
      default: '#3c3c3c'
    },
    primary: {
      main: grey[50]
    },
    secondary: {
      main: grey[200]
    },
    mode: 'dark' as PaletteMode // нужно обязательно указать "PaletteMode", иначе createTheme не примет (опции) темы
  }
}

export const lightTheme = {
  palette: {
    background: {
      default: '#f6f6f8'
    },
    primary: {
      main: grey[50]
    },
    secondary: {
      main: grey[200]
    },
    mode: 'light' as PaletteMode // нужно обязательно указать "PaletteMode", иначе createTheme не примет (опции) темы
  }
}
