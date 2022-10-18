import nextConnect from "next-connect"
import { HTTP_STATUS_CODE } from "../../../utils/constant"
import { errorResponse, successResponse } from "../../../utils/response"

const handler = nextConnect()

handler.get(async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  }
  try {
    res.status(HTTP_STATUS_CODE.OK).json(successResponse(healthcheck))
  } catch (error) {
    healthcheck.message = error
    res.status(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE).json(errorResponse(error.message.toString()))
  }
})
export default handler
