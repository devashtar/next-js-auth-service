import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import globalStore from '@store/Global.store'
import Link from 'next/link'

import Fingerprint from '@mui/icons-material/Fingerprint'
import IconButton from '@mui/material/IconButton'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import MUISwitch from '@components/MUISwitch'

const Nav = observer(() => {
  const matches = useMediaQuery('(min-width:400px)')
  const router = useRouter()

  const activateForm = (num: number, path: string | void) => {
    if (router.pathname === path) {
      // logo всегда слушает событие клика, поэтому если вы уже на главной странице, вам не нужно дергать isLoader в GlobalStore(в общем, если не делать проверку, то мы заблокируем кнопки в NAV)
      return
    } else {
      globalStore.setIsLoading(true)
      globalStore.setTypeDisplayForm(num)
    }
  }

  return (
    <AppBar
      position='static'
      sx={{
        flexGrow: 1,
        backgroundColor: 'transparent',
        backdropFilter: 'blur(1rem)',
        boxShadow: 0
      }}
    >
      <Toolbar>
        <Link href='/'>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              onClick={() => activateForm(0, '/')}
              aria-label='fingerprint'
              color={matches ? 'warning' : 'success'}
            >
              <Fingerprint />
            </IconButton>
          </Box>
        </Link>

        <Box
          sx={{
            position: 'relative',
            borderBottom: (theme) =>
              theme.palette.mode === 'light'
                ? '1px solid rgba(255,218,185, 0.5)'
                : '0',
            mr: matches ? 2 : 0.5,
            p: matches ? 1 : 0.5
          }}
        >
          <Link href='/auth'>
            <Button
              onClick={() => activateForm(2)}
              size='small'
              sx={{ mr: 2 }}
              variant='outlined'
              color='inherit'
              disabled={
                globalStore.typeDisplayForm === 2 || globalStore.isLoading
              }
            >
              sing in
            </Button>
          </Link>
          <Link href='/reg'>
            <Button
              onClick={() => activateForm(1)}
              size='small'
              variant='outlined'
              color='inherit'
              disabled={
                globalStore.typeDisplayForm === 1 || globalStore.isLoading
              }
            >
              sing up
            </Button>
          </Link>
        </Box>

        <MUISwitch checked={!globalStore.isDark} />
      </Toolbar>
      <Box sx={{ width: '100%', position: 'absolute', top: '100%' }}>
        {globalStore.isLoading && (
          <LinearProgress color={globalStore.isDark ? 'primary' : 'warning'} />
        )}
      </Box>
    </AppBar>
  )
})

export default Nav
