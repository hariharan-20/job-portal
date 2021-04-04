const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
    },
    companyname: {
        type: String,
    },
    companylogo: {
        type: Buffer,
    },
    category: {
        type: String,
    },
    location: {
        type: String,
    },
    qualification: {
        type: String,
    },
    skills: [
        String,
    ],
    minsalary: {
        type: String,
    },
    maxsalary: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastDate: {
        type: String,
    },
    description: {
        type: String,
    },

    // User having isemployer equals to true
    postedby: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // Limited in number
    maxexperience: {
        type: String,
    },
    minexperience: {
        type: String,
    },
    // Limited in number
    jobType: {
        type: String,
    },
    summery: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Open', 'Close'],
        default: "Open"
    },
    // For mass recruiter
    ismassrecruiter: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = Job = mongoose.model('Job', jobSchema);