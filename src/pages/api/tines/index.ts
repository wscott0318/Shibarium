import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from "next"
import * as Sentry from '@sentry/nextjs'

// @ts-ignore TYPE NEEDS FIXING
const handler =  (req: NextApiRequest, res: NextApiResponse) => {
  try{
    res.status(200).json([])
  }catch(err:any){
    Sentry.captureMessage("handler in api/tines", err);
  }
}
