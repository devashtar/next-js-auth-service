import type { NextApiRequest, NextApiResponse } from 'next'
import userService from '@services/user.service'

type ResponseData = {
  token: string
}

// При успехе отдаём секретный ключ для другого сервиса
// К примеру, другой сервис принимает в параметре ключ для идентификации пользователя
// Нам остается сделать только GET запрос с этим ключом в параметре
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  try {
    const { code } = req.body as { code: string }
    const codeObj = await userService.checkCode(code)
    if (codeObj !== undefined) {
      res.status(200).json({ token: 'secret-key-for-login-other-service' })
    } else {
      res.status(401).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
