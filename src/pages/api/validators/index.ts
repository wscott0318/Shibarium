import type { NextApiRequest, NextApiResponse } from "next"
import { withSentry } from "@sentry/nextjs";
import * as Sentry from '@sentry/nextjs'

// @ts-ignore TYPE NEEDS FIXING
const handler =  (req: NextApiRequest, res: NextApiResponse) => {
  try{
    res.status(200).json([])
  }catch(err:any){
    Sentry.captureMessage("handler in api/validators", err);
  }
}

export default withSentry(handler) //NOSONAR 
