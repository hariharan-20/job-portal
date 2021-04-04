const Skill = require('../models/skill/skill')
const {
    successResponse,
    errorResponse
} = require('../utils/responseHandler')
const {
    validateRequestHandler,
    isValid
} = require('../utils/validatorHandler');


// Create new skill by admin
const createNewSkill = async (req, res) => {

    // Validate Data
    if (!isValid(req)) return validateRequestHandler(req, res);

    let temp_skill = await Skill.findOne({
        name: req.body.name
    })

    // TODO check for similar skills

    console.log("Temp Skill ", temp_skill)

    if (temp_skill) {
        console.log("Working Inside IF")
        return errorResponse(res, [{
            msg: "Skill already exists"
        }])
    }
    console.log("Working")
    let skill = new Skill()
    skill.name = req.body.name
    try {
        await skill.save()
        successResponse(res, {
            msg: "New skill created"
        }, 200, "New skill created")
    } catch (e) {
        // Log error to databases
        errorResponse(res, {
            msg: "Error creating new skills"
        })
    }
}

// Get all skills Only for admin routes
const getAllSkills = (req, res) => {
    try {
        let data = Skill.find()
        successResponse(res, data, "Get all skills!")
    } catch (e) {
        errorResponse(res, {
            msg: "Error getting all skills"
        })
    }

}

/*
        User or application controllers
*/

// Add new skill by user to its database i.e. User's skills
const addNewSkill = (req, res) => {


}

// Get my all skills by user
const getMySkills = (req, res) => {
    successResponse(res, {}, "Get all my skills working!")
}

module.exports = {
    createNewSkill,
    addNewSkill,
    getMySkills,
    getAllSkills
}