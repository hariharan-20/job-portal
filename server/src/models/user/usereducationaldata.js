const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usereducationaldataSchema = Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    // Qualification
    school: {
        type: String,
    },
    degree: {
        type: String,
    },
    fieldOfStudy: {
        type: String,
    },
    startyear: {
        type: String,
    },
    startmonth: {
        type: String,
    },
    endyear: {
        type: String,
    },
    endmonth: {
        type: String,
    },
    passingyear: {
        type: String,
    },
    desc: {
        type: String
    },
    location: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = UserEducationalData = mongoose.model('UserEdducationalData', usereducationaldataSchema);