import Link from 'next/link'
import MUILink from '@mui/material/Link'
import { useMemo, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { debounce } from 'lodash'
import globalStore from '@store/Global.store'
import { validationRegSchema } from './validate'
import { SxProps } from '@mui/system'
import { useRouter } from 'next/router'
import axios from 'axios'

const stylesHelperText = {
  textIndent: 6,
  position: 'absolute',
  top: '100%',
  p: 0,
  m: 0,
  lineHeight: 1.4
} as SxProps

const stylesBoxForm = {
  borderRadius: '4px',
  margin: '3rem auto',
  p: '2rem .5rem',
  minWidth: '320px',
  maxWidth: '420px',
  width: '100%',
  bgcolor: (theme: any) =>
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(1rem)',
  position: 'relative'
} as SxProps

// Выдержка времени после ввода перед проверкой валидации
const DEBOUNCED_TIME_USERNAME = 1000 // через секунду после ввода запрос на сервер, чтобы проверить свободен ли текущий USERNAME
const DEBOUNCED_TIME_FORM = 300 // проверка в остальных полях ввода, через 300мс после ввода
const DEBOUNCED_TIME_STRONG_PASSWORD = 300 // проверка длины пароля(показатель надежности)

const Reg = () => {
  const [strongPassword, setStrongPassword] = useState(false) // позволяем пользователю использовать ненадежный пароль, но повещаем об этом в форме
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: 'test@gmail.com',
      username: 'testname',
      password: '1111111111111111',
      passwordConfirmation: '1111111111111111'
    },
    validateOnChange: false,
    validationSchema: validationRegSchema,
    onSubmit: async (values) => {
      axios
        .post('/api/reg', values)
        .then(() => {
          formik.setSubmitting(false) // чтобы кнопки стали снова активны и убрать анимацию загрузки
          router.push('/auth') // после успеха, перенаправляем на другую страницу
        })
        .catch((err) => {
          if (err.response.status === 400) {
            formik.setFieldError(
              'email',
              'данный email уже зарегистрирован, проверьте почту или используйте другой email для аккаунта'
            )
          }
        })
    }
  })

  // асинхронный запрос на сервер, с проверкой username(свободен или нет)
  const debouncedValidateUsername = useMemo(
    () => debounce(formik.validateForm, DEBOUNCED_TIME_USERNAME),
    [formik.validateForm]
  )

  // валидация формы после ввода, через определенный промежуток времени
  const debouncedValidateForm = useMemo(
    () => debounce(formik.validateForm, DEBOUNCED_TIME_FORM),
    [formik.validateForm]
  )

  // проверка надежности пароля(по длине) после ввода, через определенный промежуток времени
  const debounceCheckStrongPassword = useMemo(
    () =>
      debounce(() => {
        const lengthStr = formik.values.password.length
        if (lengthStr !== 0) {
          if (lengthStr <= 12) {
            setStrongPassword(false)
          } else if (lengthStr > 12) {
            setStrongPassword(true)
          }
        }
      }, DEBOUNCED_TIME_STRONG_PASSWORD),
    [formik.values.password]
  )

  useEffect(() => {
    debouncedValidateUsername()
    return () => {
      debouncedValidateUsername.cancel() // отключаем асинхронные слушатели, перед размонтированием
    }
  }, [formik.values.username, debouncedValidateUsername])

  useEffect(() => {
    debouncedValidateForm()
    debounceCheckStrongPassword()
    return () => {
      debouncedValidateForm.cancel() // отключаем асинхронные слушатели, перед размонтированием
      debounceCheckStrongPassword.cancel() // отключаем асинхронные слушатели, перед размонтированием
    }
  }, [
    formik.values.email,
    formik.values.password,
    formik.values.passwordConfirmation,
    debouncedValidateForm,
    debounceCheckStrongPassword
  ])

  return (
    <Box sx={stylesBoxForm}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ position: 'relative', mb: 5 }}
          fullWidth
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          focused={formik.touched.email && !Boolean(formik.errors.email)}
          color={
            formik.touched.email && !Boolean(formik.errors.email)
              ? 'success'
              : 'primary'
          }
          FormHelperTextProps={{ sx: stylesHelperText }}
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <TextField
          sx={{ position: 'relative', mb: 5 }}
          fullWidth
          id='login'
          name='username'
          label='Username'
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          focused={formik.touched.username && !Boolean(formik.errors.username)}
          color={
            formik.touched.username && !Boolean(formik.errors.username)
              ? 'success'
              : 'primary'
          }
          FormHelperTextProps={{ sx: stylesHelperText }}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          sx={{ position: 'relative', mb: 5 }}
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          focused={formik.touched.password && !Boolean(formik.errors.password)}
          color={
            formik.touched.password &&
            !Boolean(formik.errors.password) &&
            !strongPassword
              ? 'warning'
              : formik.touched.password &&
                !Boolean(formik.errors.password) &&
                strongPassword
              ? 'success'
              : 'primary'
          }
          FormHelperTextProps={{ sx: stylesHelperText }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            formik.touched.password &&
            (formik.errors.password ||
              (strongPassword ? 'надёжный' : 'плохая надежность'))
          }
        />
        <TextField
          sx={{ position: 'relative', mb: 5 }}
          fullWidth
          id='passwordConfirmation'
          name='passwordConfirmation'
          label='Confirm password'
          type='password'
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          focused={
            formik.touched.passwordConfirmation &&
            !Boolean(formik.errors.passwordConfirmation)
          }
          color={
            formik.touched.passwordConfirmation &&
            formik.values.passwordConfirmation.length !== 0 &&
            !Boolean(formik.errors.passwordConfirmation)
              ? 'success'
              : 'primary'
          }
          FormHelperTextProps={{ sx: stylesHelperText }}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
        />

        <Link href='/auth' passHref>
          <MUILink
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#56bffd' : '#b8e5ff'
            }}
            onClick={() => globalStore.setIsLoading(true)}
            component='button'
            variant='body2'
            underline='hover'
          >
            Уже есть аккаунт?
          </MUILink>
        </Link>

        <LoadingButton
          loading={formik.isSubmitting}
          sx={{ mt: 3 }}
          color='primary'
          variant='contained'
          fullWidth
          type='submit'
          endIcon={<SendIcon />}
        >
          Submit
        </LoadingButton>
        <Link href='/' passHref>
          <LoadingButton
            loading={formik.isSubmitting}
            onClick={() => globalStore.setTypeDisplayForm(0)}
            sx={{ mt: 4 }}
            color='secondary'
            variant='contained'
            fullWidth
            type='button'
          >
            back to Home
          </LoadingButton>
        </Link>
      </form>
    </Box>
  )
}

export default Reg
