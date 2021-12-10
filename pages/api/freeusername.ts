import type { NextApiRequest, NextApiResponse } from 'next'
import userService from '@services/user.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const { email } = req.body as { email: string }
    const result = await userService.checkFreeUsername(email) // проверяем свободен ли username
    if (result === undefined) {
      res.status(200).end()
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
