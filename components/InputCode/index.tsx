import styles from './index.module.scss'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MUILink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import ReactCodeInput from 'react-verification-code-input'
import { useTimer } from 'react-timer-hook'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function InputCode() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const TIME_LIMIT_IN_THE_SECONDS = 300

  const { seconds, minutes, isRunning, restart } = useTimer({
    autoStart: true,
    expiryTimestamp: new Date(Date.now() + TIME_LIMIT_IN_THE_SECONDS * 1000),
    onExpire: () => console.log('expires')
  })

  const onComplete = (val: string) => {
    if (!isRunning) return
    setIsSubmitting(true)
    axios
      .post('/api/confirm-code', { code: val })
      .then((res) => {
        const { token } = res.data as { token: string }
        router.replace('https://www.google.ru/') // можно передать токен в параметре
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setOpenAlert(true)
          setTimeout(() => {
            setOpenAlert(false)
          }, 2000)
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const resendCodeValidation = () => {
    restart(new Date(Date.now() + TIME_LIMIT_IN_THE_SECONDS * 1000))
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          m: '0 auto',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(0,0,0,.2)'
              : 'rgba(255,255,255,.2)',
          backdropFilter: 'blur(1rem)',
          p: '1rem 0px 3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          minWidth: '280px',
          maxWidth: '420px',
          width: '100%',
          borderRadius: 2
        }}
      >
        <MUILink
          sx={{ color: '#56bffd', mb: 2 }}
          component='button'
          variant='body2'
          underline='always'
        >
          <a href='/'>Вернуться на главную</a>
        </MUILink>

        <Typography variant='h6'>Введите код подтверждения:</Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#50667d' : '#b2cae2'
          }}
          variant='body2'
        >
          Код был отправлен на вашу почту, если код не пришел то можно запросить
          повторно.
        </Typography>

        <ReactCodeInput className={styles.container} onComplete={onComplete} />

        <Typography variant='subtitle1'>
          осталось времени:
          {` ${('00' + minutes).slice(-2)}:${('00' + seconds).slice(-2)}`}
        </Typography>
        <MUILink
          sx={{ color: '#56bffd', mt: 2 }}
          onClick={() => resendCodeValidation()}
          component='button'
          variant='body2'
          underline='hover'
          disabled={isSubmitting}
        >
          Отправить повторно код на почту
        </MUILink>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!isRunning}
        message='Время истекло'
        action={
          <Button
            onClick={() => resendCodeValidation()}
            variant='text'
            size='small'
            color='warning'
          >
            отправить еще
          </Button>
        }
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openAlert}
        message='Код устарел, попробуйте заного'
      />
    </Box>
  )
}
