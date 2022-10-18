import React from 'react'

const index = () => {

    // const getUptime = () => {
    //     router.get('/health', (req, res) => {
    //         const data = {
    //           uptime: process.uptime(),
    //           message: 'Ok',
    //           date: new Date()
    //         }
    //         res.status(200).send(data);
    //       });
    // }

    console.log(process.uptime())
  return (
    <div>Status 200(true) </div>
  )
}

export default index