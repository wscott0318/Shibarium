import type { NextApiRequest, NextApiResponse } from "next"
import { withSentry } from "@sentry/nextjs";

// @ts-ignore TYPE NEEDS FIXING
const handler =  (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([])
}

export default withSentry(handler)
