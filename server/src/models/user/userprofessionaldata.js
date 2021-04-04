const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userprofessionaldataSchema = Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // CV Url
    cvurl: {
        type: String,
    },
    // Job Location
    location: {
        type: String,
    },
    // Current Designation
    currentdesignation: {
        type: String,
    },
    companyname: {
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
    iscurrentlyworkhere: {
        type: Boolean,
        default: false,
    },
    workdescription: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = UserProfessionalData = mongoose.model('UserProfessionalData', userprofessionaldataSchema);