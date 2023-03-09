/**
 * Formats the error response structure
 *
 * @param {string} message Error Message
 * @param {string[]} data Error Data
 * @return {object} Error response object
 * */
 const errorResponse = (message, data = []) => {
    return { status: "error", message, data }
  }
  
  /**
   * Formats the success response structure
   *
   * @param {string} message success Message
   * @param {object} data success Data
   * @return {object} success response object
   * */
  const successResponse = (message, data) => {
    return { status: "success", message, data }
  }
  
  module.exports = { errorResponse, successResponse }