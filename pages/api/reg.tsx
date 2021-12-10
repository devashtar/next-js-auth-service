import type { NextApiRequest, NextApiResponse } from 'next'
import userService from '@services/user.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const result = await userService.checkReservedEmail(req.body) // проверяем свободен ли email
    if (result === undefined) {
      await userService.createUser(req.body)
      res.status(200).end()
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
