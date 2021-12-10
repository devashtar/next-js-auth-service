import type { NextApiRequest, NextApiResponse } from 'next'
import userService from '@services/user.service'

type ResponseData = {
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  try {
    const user = await userService.findByEmailAndPassword(req.body)
    if (user !== undefined) {
      res.status(200).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
