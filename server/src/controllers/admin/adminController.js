const User = require('../../models/user/user')
const UserPersonalData = require('../../models/user/userpersonaldata')
const UserEducationalData = require('../../models/user/usereducationaldata')
const UserProfessionalData = require('../../models/user/userprofessionaldata')
const UserLog = require('../../models/user/userlog')
const UserSave = require('../../models/user/usersave')
const UserSkills = require('../../models/user/userskills')
const UserRole = require('../../models/user/role')
const Job = require('../../models/job/job')
const JobApplication = require('../../models/job/jobapplication')

const {
    successResponse,
    errorResponse
} = require('../../utils/responseHandler')
const {
    validateRequestHandler,
    isValid
} = require('../../utils/validatorHandler');

// Get Dashboard Data
const dashboardData = async (req, res) => {

    let userCount = await User.find().count()
    let jobCount = await Job.find().count()
    let jobapplication = await JobApplication.find().count()
    let recentJobs = await await Job.find().sort({
        createdAt: -1
    })

    successResponse(res, {
        users: userCount,
        jobs: jobCount,
        applications: jobapplication,
        recentjobs: recentJobs,
    }, 200, "Dashboard Working")
}

module.exports = {
    dashboardData
}