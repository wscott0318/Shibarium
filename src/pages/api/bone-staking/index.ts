import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from "next"
// @ts-ignore TYPE NEEDS FIXING
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  throw new Error("Custom error")
  res.status(200).json([{ id: 1 }, { id: 2 }])
}

export default withSentry(handler)
