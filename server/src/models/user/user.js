const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    isemailverified: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
    },
    isphoneverified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
    },
    // To force user to reset password
    ispasswordexpired: {
        type: Boolean,
        default: false,
    },
    // To allow user to deactive account
    isactive: {
        type: Boolean,
        default: true,
    },
    // To allow user to suspend a user
    issuspended: {
        type: Boolean,
        default: false,
    },
    suspendedBy: {
        type: String,
        default: "NA"
    },
    suspenddescription: {
        type: String,
        default: "NA"
    },
    /*
        Decided by userController to set the variable true or false
    */
    userrole: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        require: true,
    }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', userSchema);