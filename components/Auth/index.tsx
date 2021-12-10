import Link from 'next/link'
import MUILink from '@mui/material/Link'
import { useMemo, useEffect } from 'react'
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { debounce } from 'lodash'
import globalStore from '@store/Global.store'
import { validationAuthSchema } from './validate'
import { SxProps } from '@mui/system'
import { useRouter } from 'next/router'

const stylesHelperText = {
  textIndent: 6,
  position: 'absolute',
  top: '100%',
  p: 0,
  m: 0,
  mt: 0.8,
  lineHeight: 1
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
const DEBOUNCED_TIME_FORM = 300 // проверка в остальных полях ввода, через 300мс после ввода

const Auth = () => {
  const router = useRouter()

  const goToAuthForm = () => {
    globalStore.setIsLoading(true)
    globalStore.setTypeDisplayForm(2)
  }

  const formik = useFormik({
    initialValues: {
      email: 'test@gmail.com',
      password: '1111111111111111'
    },
    validateOnChange: false,
    validationSchema: validationAuthSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        formik.setSubmitting(false)
        router.replace('/confirm-code')
      }, 2000)
    }
  })

  const debouncedValidateForm = useMemo(
    () => debounce(formik.validateForm, DEBOUNCED_TIME_FORM),
    [formik.validateForm]
  )

  useEffect(() => {
    debouncedValidateForm()
    return () => {
      debouncedValidateForm.cancel() // отключаем асинхронные слушатели, перед размонтированием
    }
  }, [formik.values.email, formik.values.password, debouncedValidateForm])

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
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          focused={formik.touched.password && !Boolean(formik.errors.password)}
          color={
            formik.touched.password && !Boolean(formik.errors.password)
              ? 'success'
              : 'primary'
          }
          FormHelperTextProps={{ sx: stylesHelperText }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Link href='/reg'>
          <MUILink
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#56bffd' : '#b8e5ff'
            }}
            onClick={() => goToAuthForm()}
            component='button'
            variant='body2'
            underline='hover'
          >
            Еще не зарегистрированы?
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
        <Link href='/'>
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

export default Auth
