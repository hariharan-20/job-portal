const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersaveSchema = Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
    },
    jobid: {
        type: mongoose.Types.ObjectId,
        ref: 'Job',
        require: true
    },
    /*
        J -> Jobs 
        G -> Government Jobs
        M -> Mass Recruiter
    */
    jobtype: {
        type: String,
        enum: ["J", "G", 'M'],
        default: "J"
    }
}, {
    timestamps: true
})

module.exports = UserSavse = mongoose.model('UserSave', usersaveSchema);