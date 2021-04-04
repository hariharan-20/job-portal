const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const govjobSchema = Schema({
    // Name of Vacancy
    title: {
        type: String,
    },
    // Description of job
    description: {
        type: String,
    },
    // Tentative Dates of Vacancy
    tentativedate: {
        type: String,
    },
    regfee: {
        type: String,
    },
    city: {
        type: String,
    },
    // Number of Vacancies
    novac: {
        type: String,
    },
    notificationPDF: {
        type: String,
    },
    regLink: {
        type: Boolean,
        default: true
    },
    // User having isemployer equals to true
    postedby: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Limited in number
    jobType: {
        type: String,
    },
    status: {
        type: String,
        default: "Posted"
    }
    // Add Status TODO
}, {
    timestamps: true
})

module.exports = GovJob = mongoose.model('GovJob', govjobSchema);