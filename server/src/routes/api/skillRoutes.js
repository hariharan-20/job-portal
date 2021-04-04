const router = require("express").Router()
const {
    createNewSkill,
    addNewSkill,
    getMySkills,
    getAllSkills,
} = require("../../controllers/skillController")
const {
    body
} = require("express-validator");


/*

    Admin / Secure API routes

*/

// Get all created routes
router.post('/', getAllSkills)

// Add Create new skill to database by admin
router.post('/create', body("name").exists().not().isEmpty().withMessage("Skill name is required!"), createNewSkill)


/*

    User routes i.e. Application Routes

*/

// Add new skill to user database i.e. User interest
router.post('/add', addNewSkill)

// Get my all skills
router.post('/myskills', getMySkills)

module.exports = router;