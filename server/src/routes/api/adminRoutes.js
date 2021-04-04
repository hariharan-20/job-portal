const router = require("express").Router()
const {
    ensureUserJobSeeker,
    ensureUserEmployer,
} = require('../../middlewares/auth')

const {
    dashboardData
} = require("../../controllers/admin/adminController")

// Get Dashboard Data
router.get('/dashboard', dashboardData)

module.exports = router;