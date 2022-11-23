// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from "@sentry/nextjs";
import * as Sentry from '@sentry/nextjs'
const handler = (req, res) => {
 try{
  res.status(200).json({ name: "John Doe" });
 } catch ( error){
  Sentry.captureMessage(error)
 }
};

export default withSentry(handler);