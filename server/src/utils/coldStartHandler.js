const bcrypt = require('bcryptjs')

const Role = require('../models/user/role')
const User = require('../models/user/user')


const coldStart = async () => {
    let roles = await Role.find()
    console.log(roles)

    // If no roles, create roles
    let userRole = new Role({
        rolename: "User",
        roleid: 100,
        roletype: 'U'
    })
    let employerRole = new Role({
        rolename: "Employers",
        roleid: 200,
        roletype: 'E'
    })
    let adminRole = new Role({
        rolename: "Admin",
        roleid: 300,
        roletype: 'A'
    })
    // console.log(roles);
    // console.log(roles.length);

    if (roles && roles.length == 0) {
        console.log("Working")
        try {
            await userRole.save()
        } catch (e) {
            console.log("User Role Error");
            console.log(e)
        }

        try {
            await employerRole.save()
        } catch (e) {
            console.log("Employer Role Error");
        }
        try {
            await adminRole.save()
        } catch (e) {
            console.log("Admin Role Error");
        }
    }

    let users = await User.find()
    // console.log(users);

    // If no users, create admin
    const salt = await bcrypt.genSalt(10)
    var adminPassword = await bcrypt.hash('Mok7765HGH%%-dkf', salt)

    let adminUser = new User({
        name: "Verzeo",
        email: "tech@verzeo.com",
        phone: "9805402769",
        password: adminPassword,
        userrole: adminRole._id
    })

    try {
        await adminUser.save()
    } catch (e) {
        // Handle Duplicate email error
    }


}

module.exports = coldStart