import * as yup from 'yup'

export const validationAuthSchema = yup.object({
  email: yup.string().email('некорректный email').required('Email обязателен'),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(20, 'Пароль должен содержать максимум 20 символов')
    .matches(/^[^\s]+$/g, 'Пароль не должен содержать пробелы')
    .required('Пароль обязателен')
})
