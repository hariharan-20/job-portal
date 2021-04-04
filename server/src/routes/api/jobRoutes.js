const router = require("express").Router()
const {
    ensureUserJobSeeker,
    ensureUserEmployer,
    ensureAdmin,
} = require('../../middlewares/auth')
const {
    postNewJob,
    getAllJobs,
    getAllJobsCount,
    getMyJobs,
    jobApplication,
    getMyJobApplication,
    getMyApplications,
    editJob,
    editJobStatus,
    deactivateJob,
    getJobDetails,
    getJobApplicationCount,
    getAllJobApplicationCount,
    downloadUserCV
} = require("../../controllers/jobController")

const {
    createGovJob,
    getAllGovJobs,
    editGovJob,
    deactivateGovJob

} = require("../../controllers/govJobController")

const upload = require('../../utils/multerHandler')
const {
    multerErrorHandling
} = require('../../utils/multerErrorHandle')


const {
    route
} = require("./userRoutes")

// Post New Job by employer
router.post('/new', ensureUserEmployer, upload.single("image"), multerErrorHandling, postNewJob)


router.get('/getJobDetails', getJobDetails)
router.post('/getJobDetails', getJobDetails)

// Get all jobs without filter Active as well as Not Active
/*
   GET /wfall?location=Bangalore
   GET /wfall?company=Verzeo
   GET /wfall?title=Feb 27 TEst
   GET /wfall?page=0&limit=10
 */
router.get('/wfall', getAllJobs)

router.get('/wfallCount', getAllJobsCount)


router.post('/edit',ensureUserEmployer, upload.single("image"), multerErrorHandling,editJob)
router.post('/editstatus', editJobStatus)
router.post('/deactivate', deactivateJob)


// Get all jobs posted by employer
router.get('/my-posted-jobs', ensureUserEmployer, getMyJobs)

// Apply for a job 
// Only user can apply for the job
router.post('/apply-for-job', ensureUserJobSeeker, jobApplication)

// Get job application 
// Owner of the posted job can see the job appliation of the jobs
router.post('/get-job-application', ensureUserEmployer, getMyJobApplication)

// Get Applied Job
// Get all application by user
router.get('/get-my-applications', ensureUserJobSeeker, getMyApplications)


router.post('/job-application-count', ensureUserEmployer, getJobApplicationCount)

router.get('/all-job-application-count', ensureUserEmployer, getAllJobApplicationCount)


// To download the CV of the user
// cvd -> CV Download
router.post('/cvd',ensureUserEmployer,downloadUserCV)



// Remove my job
/*
    Not going 
*/


/*
    Govt Jobs routes
*/

router.post('/newGovt',ensureAdmin,createGovJob)

router.post('/editGovt/:id',ensureAdmin,editGovJob)

router.post('/changeStatusGovt/:id',ensureAdmin,deactivateGovJob)


/*
    GET /govtJobs?location=Chennai
    GET /govtJobs?title=Service Officer 
*/
router.get('/govtJobs',getAllGovJobs)


module.exports = router;