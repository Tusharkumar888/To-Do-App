const express = require('express')
const adminRoutes =express.Router()


adminRoutes.get('/login',(req,res)=>{

    res.json({key:"admin tushar"})
})



module.exports = adminRoutes;