const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userlogSchema = Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // ipaddress: {
    //     type: String,
    // },
    device: {
        type: String,
    },
    message: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = UserLog = mongoose.model('UserLog', userlogSchema);