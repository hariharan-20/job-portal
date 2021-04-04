const User = require('../models/user/user')
const UserPersonalData = require('../models/user/userpersonaldata')
const UserEducationalData = require('../models/user/usereducationaldata')
const UserProfessionalData = require('../models/user/userprofessionaldata')
const UserLog = require('../models/user/userlog')
const UserSave = require('../models/user/usersave')
const UserSkills = require('../models/user/userskills')
const UserRole = require('../models/user/role')


const {
    getUserProfilePercentage
} = require('../utils/userHelper')

const Role = require('../models/user/role')


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
    reducePicSize
} = require('../utils/sharpHandler');

const {
    validateRequestHandler,
    isValid
} = require('../utils/validatorHandler');
const {
    successResponse,
    errorResponse
} = require('../utils/responseHandler')
const {
    sendResetPasswordMail
} = require('../utils/nodemailerHandler')
const user = require('../models/user/user')

const privateKey = "1234345678ijhgfxdrexfghn5"

/*

    Status Code 201 success is for employer 

    Status Code 202 success is for user job seeker

*/

/*

> Employer (210 - 230)
- 210 --> Success
- 211 --> Error
- 212 --> Data needed
- 213 --> Validation error
- 214 --> Access Denied
- 215 --> Account Created
- 216 --> Created (For post requests)

> Job Seeker (240 - 260)
- 240 --> Success
- 241 --> Error
- 242 --> Data needed
- 243 --> Validation error
- 244 --> Access Denied
- 245 --> Account Created
- 246 --> Created (For post requests)

*/



// User need jobs
const newUser = async (req, res, next) => {
    // Get _id of Role U i.e. user
    let userRole = await Role.findOne({
        roleid: 100
    })

    // Get Data
    const data = req.body
    console.log(
        data
    );

    // Validate Data
    if (!isValid(req)) return validateRequestHandler(req, res);

    // Check for already exit account with same email id
    var temp_user = await User.findOne({
        email: data.email
    })
    if (temp_user) {
        // Account already exists
        return errorResponse(res, [{
            msg: "Account already exists."
        }])
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10)
    var hashed_password = await bcrypt.hash(data.password, salt)

    // Save User
    let newUser = await new User()
    newUser.name = data.name
    newUser.email = data.email
    newUser.password = hashed_password
    newUser.phone = data.phone
    newUser.userrole = userRole._id
    try {
        await newUser.save()

        // Log User Activity
        let log = new UserLog()
        log.userid = newUser._id
        log.device = "NA"
        log.message = "SignUp"
        log.save()


        // Starting Login Process
        return next()

    } catch (e) {
        // Save to the log (i.e. System Log for furhter investigation)
        console.log(e)
        errorResponse(res, [{
            msg: "Error creating account"
        }], 500)
    }
}

const checkingAuthentication=async(req,res)=>{
    successResponse(res, {
        userType:req.user.userrole.roletype,
        msg:'Authenticated'
    }, 200)
}


// User giving joobs
const newUserEmployer = async (req, res, next) => {
    // Get _id of Role U i.e. user
    let employerRole = await Role.findOne({
        roleid: 200
    })

    // Get Data
    let data = req.body

    // Validate Data
    if (!isValid(req)) return validateRequestHandler(req, res);

    // Check for already exit account with same email id
    var temp_user = await User.findOne({
        email: data.email
    })
    if (temp_user) {
        // Account already exists
        return errorResponse(res, [{
            msg: "Account already exists."
        }], 400)
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10)
    var hashed_password = await bcrypt.hash(data.password, salt)

    // Save User
    let newUser = await new User()
    newUser.name = data.name
    newUser.email = data.email
    newUser.password = hashed_password
    newUser.phone = data.phone
    newUser.userrole = employerRole._id
    try {
        await newUser.save()

        // Log User Activity
        let log = new UserLog()
        log.userid = newUser._id
        log.device = "NA"
        log.message = "SignUp"
        log.save()

        // Starting Login Process
        return next()

    } catch (e) {
        // Save to the log (i.e. System Log for furhter investigation)
        console.log(e)
        return errorResponse(res, [{
            msg: "Error creating account"
        }], 500)
    }
}


// Login using passport
const passportLogin = async (req, res) => {
    // Validate Data
    if (!isValid(req)) return validateRequestHandler(req, res);

    // Log User Activity
    let log = new UserLog()
    log.userid = newUser._id
    log.device = "NA"
    log.message = "SignIn"
    log.save()

    let test = getUserProfilePercentage(req.user._id)
    console.log(test);


    let profilePercentage = await getUserProfilePercentage(req.user._id)


    // Send Response
    successResponse(res, {
        userType: req.user.userrole.roletype,
        userId: req.user._id,
        userEmail: req.user.email,
        userName: req.user.name,
        userPhone: req.user.phone,
        msg: 'Login was successful! ',
        profilePercentage: profilePercentage,
    }, 200)
}

// Change Password
const changePassword = async (req, res) => {

}



/*
    Reset password using email link
*/


// Send Forgot Password Link
const forgotPasswordLink = async (req, res) => {

    try {
        // Get Data
        const data = req.body

        // Validate Data
        if (!isValid(req)) return validateRequestHandler(req, res);

        // Find Account
        let user = await User.findOne({
            email: data.email
        })

        if (!user) {
            // User Not Found
            return errorResponse(res, [{
                msg: "User Not Found"
            }], 404)
        }

        // If user exists

        // Generate Token
        var token = await jwt.sign({
            user: user._id,
            validBefore: Date.now() + 3600000
        }, privateKey);


        const arg = {
            to: user.email,
            subject: 'Forgot Password - JobPortal',
            token: token,
            name: user.name

        };
        // Send token to user mail id
        sendResetPasswordMail(arg);


        successResponse(res, {
            msg: "Link Send to email id"
        }, 200)

    } catch (e) {

        return errorResponse(res, [{
            msg: "Something went wrong!"
        }], 500)
    }
}

// Verify token and show reset password ui
const verifyToken = async (req, res) => {

}

const newPassword = async (req, res) => {
    const {
        password,
        token
    } = req.body;
    try {
        const decoded = jwt.verify(token, privateKey);
        const id = decoded.user;

        if (decoded.validBefore < Date.now()) {

            return errorResponse(res, [{
                msg: "Token got expired!"
            }], 400)

        }

        const salt = await bcrypt.genSalt(10)
        var hashed_password = await bcrypt.hash(password, salt)
        await User.findOneAndUpdate({
            _id: id
        }, {
            password: hashed_password
        }, {
            new: true
        })
        successResponse(res, {
            msg: "New password created successfully!"
        }, 201)


    } catch (e) {

        return errorResponse(res, [{
            msg: "Something went worng!"
        }], 500)
    }

}



// Reset Password using Link
// Verify token
const resetPasswordLink = async (req, res) => {

    try {

        var token = await jwt.sign({
            user: req.user._id,
            validBefore: Date.now() + 3600000
        }, privateKey);


        const arg = {
            to: req.user.email,
            subject: 'Reset Password - JobPortal',
            token: token,
            name: req.user.name,

        };
        // Send token to user mail id
        sendResetPasswordMail(arg);
        successResponse(res, {
            msg: "Link Send to email id"
        }, 200)

    } catch (e) {
        return errorResponse(res, [{
            msg: "Something went wrong!"
        }], 500)

    }


}



/*
    Reset password using otp i.e. Phone OTP
*/

// Send Forgot Password OTP 
const forgotPasswordOTP = async (req, res) => {

}

// Reset Password using OTP
const resetPasswordOTP = async (req, res) => {

}

const userLogout = async (req, res) => {
    try {
        req.logout();
        successResponse(res, {
            msg: "Logout Successfully"
        }, 200)
    } catch (e) {
        return errorResponse(res, [{
            msg: "Something went worng!"
        }], 500)

    }
}

const getMyDetails = async (req, res) => {


    const id = req.user._id;
    const user = {
        email: req.user.email,
        phone: req.user.phone,
        name: req.user.name
    }
    let allUserDetails = [user]

    try {
        const personalDetails = await UserPersonalData.findOne({
            userid: id
        });
        const educationalDetails = await UserEducationalData.findOne({
            userid: id
        });
        const professionalDetails = await UserProfessionalData.findOne({
            userid: id
        });
        /*
            Get user profile percentage
        */
        let profilePercentage = await getUserProfilePercentage(req.user._id)
        allUserDetails = [user, educationalDetails, professionalDetails, personalDetails, {
            profilePercentage: profilePercentage
        }];

        successResponse(res, allUserDetails, 200)

    } catch (e) {
        return errorResponse(res, [{
            msg: "Something went worng!"
        }], 500)

    }
}


/*

    ********************************
    User profile update

*/

const updateProfilePersonal = async (req, res) => {

    console.log("Body : ", req.body);

    const id = req.user._id;
    const {
        location,
        name,
        email,
        phone
    } = req.body;
    try {

        //if photo exists

        let buffer;
        if (req.file) {
            buffer = await reducePicSize(req.file.buffer);
        }
        console.log('reduce buffer------', buffer);

        const payload = {
            location,
            displayimage: buffer
        }

        const updateDetails = {
            name,
            email,
            phone
        }


        if (req.user.email !== updateDetails.email) {
            const alreadyEmailUser = await User.findOne({
                email: updateDetails.email
            });
            if (alreadyEmailUser) {
                return errorResponse(res, [{
                    msg: "Email Already Exist!"
                }], 400)
            }
        }


        const userPersonalProfile = await UserPersonalData.findOne({
            userid: id
        })

        if (!userPersonalProfile) {
            payload.userid = id;

            const personalData = await UserPersonalData.create(payload);
            const user = await User.findOneAndUpdate({
                _id: id
            }, updateDetails, {
                new: true
            })


            return successResponse(res, {
                msg: "Added Personal Details Successfully!"
            }, 201)

        }



        const personalData = await UserPersonalData.findOneAndUpdate({
            userid: id
        }, payload, {
            new: true
        })
        const updatedUser = await User.findOneAndUpdate({
            _id: id
        }, updateDetails, {
            new: true
        })


        successResponse(res, {
            msg: "Updated Personal Details Successfully!"
        }, 200)

    } catch (e) {

        return errorResponse(res, [{
            msg: "Something went worng!"
        }], 500)

    }



}



const updateProfileEducational = async (req, res) => {

    console.log("Body : ", req.body);

    const id = req.user._id;
    const {
        school,
        degree,
        fieldOfStudy,
        passingYear,
        location,
        description
    } = req.body;

    try {

        const payload = {
            school,
            degree,
            fieldOfStudy,
            passingyear: passingYear,
            location,
            desc: description
        }


        // Checking educational profile exists or not

        const userEduProfile = await UserEducationalData.findOne({
            userid: id
        });


        //if no eductional profile

        if (!userEduProfile) {

            payload.userid = id;

            const educationalData = await UserEducationalData.create(payload);
            //console.log(educationalData);

            return successResponse(res, {
                msg: "Added Educational Details Successfully!"
            }, 201)

        }


        const educationalData = await UserEducationalData.findOneAndUpdate({
            userid: id
        }, payload, {
            new: true
        })
        console.log(educationalData);

        successResponse(res, {
            msg: "Updated Educational Details Successfully!"
        }, 200)


    } catch (e) {

        return errorResponse(res, [{
            msg: "Something went worng!"
        }], 500)

    }


}

const updateProfileProfessional = async (req, res) => {

    console.log("Body : ", req.body);


    const id = req.user._id;
    const {
        companyname,
        currentdesignation,
        startyear,
        startmonth,
        endyear,
        endmonth,
        iscurrentlyworkhere,
        description
    } = req.body;

    try {


        const payload = {
            companyname,
            currentdesignation,
            startyear,
            startmonth,
            endyear,
            endmonth,
            iscurrentlyworkhere,
            workdescription: description
        }

        // Checking professional profile exists or not

        const userProfProfile = await UserProfessionalData.findOne({
            userid: id
        });


        //if no professional profile

        if (!userProfProfile) {

            payload.userid = id;

            const professionalData = await UserProfessionalData.create(payload);
            console.log(professionalData);

            return successResponse(res, {
                msg: "Added Professional Details Successfully!"
            }, 201)

        }

        //if professional profile exist then update professional profile

        const professionalData = await UserProfessionalData.findOneAndUpdate({
            userid: id
        }, payload, {
            new: true
        })
        console.log(professionalData);
        successResponse(res, {
            msg: "Updated Professional Details Successfully!"
        }, 200)


    } catch (e) {

        return errorResponse(res, [{
            msg: "Something went worng!"
        }], 500)
    }

}


// Get details of user Profile
const userProfileDetails = async (req, res) => {
    console.log(req.user)

    const userPersonalData = await UserProfessionalData.find({
        userid: req.user._id
    })

    const userProfessionalData = await UserProfessionalData.find({
        userid: req.user._id
    })




}


// Save job to the user
const userSaveJob = async (req, res) => {

    // Check if job is already saved
    let tempSave = await UserSave.findOne({
        userid: req.user._id,
        jobid: req.body.id
    })

    if (tempSave) {
        return errorResponse(res, [{
            msg: "Job Already Saved"
        }], 401)
    }


    let userSave = UserSave()
    userSave.userid = req.user._id
    userSave.jobid = req.body.id
    userSave.jobtype = 'J'


    try {
        await userSave.save()
        return successResponse(res, {
            msg: "Job Saved"
        }, 200)
    } catch (e) {
        return errorResponse(res, [{
            msg: "Something went worng!"
        }], 500)
    }
}

// Get my saved job
const getMySavedJob = async (req, res) => {
    try {
        let mySavedJobs = await UserSave.find({
            userid: req.user._id,
        }).populate('jobid')
        console.log(mySavedJobs)
        return successResponse(res, mySavedJobs, 200)
    } catch (e) {
        return errorResponse(res, [{
            msg: "Something went worng!"
        }], 500)
    }
}

const unSavedJob=async(req,res)=>{
    
}

// Delete Saved Jobs
// ToDo 
const deleteSavedJob = async (req, res) => {
   

    let temp_data = await UserSave.findOne({
        jobid: req.params.id,
        userid: req.user._id
    })
   
    if(!temp_data){
        return errorResponse(res, [{
            msg: "No Saved Job Found!"
        }], 404)
    }

   

    try {

        await UserSave.deleteOne({_id:temp_data._id});
        return successResponse(res, {
            msg: "Saved job deleted successfully!"
        }, 200)
    } catch (e) {
        return errorResponse(res, [{
            msg: "Error Posting"
        }], 500)
    }
}


const isJobSaved = async (req, res) => {
    let jobSaved = await UserSave.findOne({
        userid: req.user._id,
        jobid: req.body.id
    })
    if (jobSaved) {
        return successResponse(res, {
            isSaved: true,
        }, 200)
    } else {
        return successResponse(res, {
            isSaved: false,
        }, 200)
    }
}

module.exports = {
    newUser,
    newUserEmployer,
    resetPasswordLink,
    newPassword,
    forgotPasswordLink,
    checkingAuthentication,
    userLogout,
    getMyDetails,
    updateProfilePersonal,
    updateProfileEducational,
    updateProfileProfessional,
    passportLogin,
    userProfileDetails,
    userSaveJob,
    getMySavedJob,
    deleteSavedJob,
    isJobSaved
}