const router = require("express").Router()
const {
    body
} = require("express-validator");
const passport = require("passport");

const upload = require('../../utils/multerHandler')
const {
    multerErrorHandling
} = require("../../utils/multerErrorHandle");
const {
    forceValidate
} = require("../../middlewares/validate")

const {
    newUser,
    newUserEmployer,
    resetPasswordLink,
    newPassword,
    forgotPasswordLink,
    userLogout,
    getMyDetails,
    updateProfilePersonal,
    updateProfileEducational,
    updateProfileProfessional,
    passportLogin,
    checkingAuthentication,
    userProfileDetails,
    userSaveJob,
    getMySavedJob,
    deleteSavedJob,
    isJobSaved
} = require("../../controllers/userController")

const {
    forwardAuthenticatedPassport,
    ensureAuthenticatedPassport,
    ensureUserJobSeeker
} = require("../../middlewares/auth");



/*


    /api/user/* 


*/


// Route for user job seeker
router.post('/new',
    [
        body("name").exists().not().isEmpty().withMessage("Name is required!"),
        body("email").exists().not().isEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
        body("password").exists().not().isEmpty().withMessage("Password is required!"),
        body("phone").exists().not().isEmpty().withMessage("Phone is required!"),
    ],
    forceValidate,
    forwardAuthenticatedPassport,
    newUser,
    passport.authenticate('local'),
    passportLogin)

router.get('/isAuthenticated', ensureAuthenticatedPassport, checkingAuthentication)

// Route for user employers
// router.post('/enew',
//     [
//         body("name").exists().not().isEmpty().withMessage("Name is required!"),
//         body("email").exists().not().isEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
//         body("password").exists().not().isEmpty().withMessage("Password is required!"),
//         body("phone").exists().not().isEmpty().withMessage("Phone is required!"),
//     ],
//     forceValidate,
//     forwardAuthenticatedPassport,
//     newUserEmployer,
//     passport.authenticate('local'),
//     passportLogin)

// Route for Login Passport With Email and Password
router.post('/login',
    [
        body("email").exists().not().isEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
        body("password").exists().not().isEmpty().withMessage("Password is required!")
    ],
    forceValidate,
    forwardAuthenticatedPassport,
    passport.authenticate('local'),
    passportLogin)

// Route to send Forgot Password Link
router.post('/forgotPasswordLink',
    [
        body("email").exists().not().isEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
    ], forgotPasswordLink)

router.post('/newPassword', newPassword)

router.get('/resetPassword', resetPasswordLink)



router.get('/allMyDetails', ensureAuthenticatedPassport, getMyDetails)




/*
    User profile update / user profile complete
*/
router.post('/myprofilepersonal/', ensureUserJobSeeker, upload.single("image"), multerErrorHandling, updateProfilePersonal)

/*
    User profile update / user profile complete
*/

router.post('/myprofileeducational', ensureUserJobSeeker, updateProfileEducational)


/*
    User profile update / user profile complete
*/

router.post('/myprofileprofessional', ensureUserJobSeeker, updateProfileProfessional)


/*
    Routes to get the details of user
*/

// router.get('/user-profile-details', ensureUserJobSeeker,userProfileDetails)


router.get('/logout', ensureAuthenticatedPassport, userLogout)



// Save Job
router.post('/save-job', ensureUserJobSeeker, userSaveJob)
router.get('/get-saved-job', ensureUserJobSeeker, getMySavedJob)
router.delete('/delete-saved-job/:id', ensureUserJobSeeker, deleteSavedJob)
router.post('/isJobSaved', ensureUserJobSeeker, isJobSaved)

/*
    email and phone verification
*/

module.exports = router;