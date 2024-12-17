const express = require('express')
const adminRoutes = require('./adminRoutes')
const userRoutes = require('./userRoutes')

const router = express.Router()

router.use('/admin',adminRoutes)
router.use('/user', userRoutes)


module.exports = router;