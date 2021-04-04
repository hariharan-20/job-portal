const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobapplicationSchema = Schema({
    // Applied By
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // Applied For
    jobid: {
        type: mongoose.Types.ObjectId,
        ref: 'Job',
    },
    // CV given at the time of application
    cvlink: {
        type: String,
        default: "NA"
    },
    // Type of Job
}, {
    timestamps: true
})

module.exports = JobApplication = mongoose.model('JobApplication', jobapplicationSchema);