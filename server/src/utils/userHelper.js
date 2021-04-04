const User = require('../models/user/user')
const UserPersonalData = require('../models/user/userpersonaldata')
const UserEducationalData = require('../models/user/usereducationaldata')
const UserProfessionalData = require('../models/user/userprofessionaldata')
const UserLog = require('../models/user/userlog')
const UserSave = require('../models/user/usersave')
const UserSkills = require('../models/user/userskills')
const UserRole = require('../models/user/role')


/*
    Number out of 100 for detail

    Personal -> 20
    Professional -> 40
    Educational -> 40
    

*/


const getUserProfilePercentage = async (id) => {
    console.log(id);

    // Total Numbers
    var total = 100

    console.log('Total 0 : ', total);

    // Personal Data
    let personalData = await UserPersonalData.findOne({
        userid: id
    })

    if (!personalData) {
        total = total - 15
    } else if (!personalData.displayimage) {
        total = total - 10
    }
    console.log(personalData)
    console.log('Total 1 : ', total);

    // Educational Data 
    let educationalData = await UserEducationalData.findOne({
        userid: id
    })

    console.log(educationalData)

    if (!educationalData) {
        total = total - 40
    }
    console.log('Total 2 : ', total);

    // Professional Data
    let professionalData = await UserProfessionalData.findOne({
        userid: id
    })

    console.log(professionalData)

    if (!professionalData) {
        total = total - 40
    }

    console.log('Total 3 : ', total);

    return total

}

module.exports = {
    getUserProfilePercentage
}