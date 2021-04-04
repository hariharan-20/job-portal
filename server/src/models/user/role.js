const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = Schema({
    // To show the name of the role (Easy for admin)
    rolename: {
        type: String,
    },
    // To check on backend (Access Controls)
    roleid: {
        type: Number,
        min: 100,
        max: 999,
        unique: true
    },
    // To differentiate between User , Employer and Admin (For easy only)
    // U -> User -> Job Seeker
    // E -> Employer
    // A -> Admin
    roletype: {
        type: String,
        enum: ["U", "E", 'A'],
        default: "U",
    }
}, {
    timestamps: true
})

module.exports = Role = mongoose.model('Role', roleSchema);