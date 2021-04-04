const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = Schema({
    location: {
        type: String,
    },
    msg: {
        type: String,
    },
    description: {
        type: String,
    }
    // Assigned to a user and send a mail
}, {
    timestamps: true
})

module.exports = Log = mongoose.model('Log', logSchema);