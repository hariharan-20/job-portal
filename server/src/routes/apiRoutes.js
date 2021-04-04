const router = require("express").Router()

/*
    Import Routes
*/
const userRoutes = require('./api/userRoutes')
const jobRoutes = require('./api/jobRoutes')
const skillRoutes = require('./api/skillRoutes')
const adminRoutes = require('./api/adminRoutes')


/*
    ######################################
    Routes
    ######################################
*/
router.use('/user', userRoutes)
router.use('/job', jobRoutes)
router.use('/skill', skillRoutes)
router.use('/admin', adminRoutes)

module.exports = router;