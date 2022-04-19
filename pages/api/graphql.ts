// Replace all this code ✨

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const server = function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

export default server