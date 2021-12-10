import * as yup from 'yup'
import axios from 'axios'

type typeDataTest = string | undefined

type DataResponseType = { isFreeUsername: boolean }

// эта функция вызывается в
const asyncCheckFreeUsername = async (
  value: typeDataTest,
  resolve: Function
) => {
  try {
    axios
      .post<DataResponseType>('/api/freeusername', { email: value })
      .then(() => resolve(true))
      .catch((err) => {
        if (err.response.status === 400) {
          resolve(false)
        }
      })
  } catch (error) {
    // возможно недоступна сеть, или что-то с сервером, нужно оповестить клиента(всплывающее окно)
    resolve(false)
  }
}

export const validationRegSchema = yup.object({
  email: yup.string().email('некорректный email').required('Email обязателен'),
  username: yup
    .string()
    .min(5, 'username должен содержать минимум 8 символов')
    .max(14, 'username должен содержать максимум 14 символов')
    .matches(/^[^\s]+$/g, 'username не должен содержать пробелы')
    .required('username обязателен')
    .test(
      'check free username',
      'данный username уже используется, используйте другой',
      (value: typeDataTest) =>
        new Promise((resolve) => asyncCheckFreeUsername(value, resolve))
    ),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(20, 'Пароль должен содержать максимум 20 символов')
    .matches(/^[^\s]+$/g, 'Пароль не должен содержать пробелы')
    .required('Пароль обязателен'),
  passwordConfirmation: yup
    .string()
    .required('Подтверждающий пароль обязателен')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
})
