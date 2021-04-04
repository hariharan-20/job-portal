const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSkillSchema = Schema({
    skillid: {
        type: mongoose.Types.ObjectId,
        ref: 'Skill',
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

module.exports = UserSkill = mongoose.model('UserSkill', userSkillSchema);