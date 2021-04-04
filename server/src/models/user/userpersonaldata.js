const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userpersonaldataSchema = Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // User Location
    location: {
        type: String,
    },
    displayimage: {
        type: Buffer,

    },
}, {
    timestamps: true
})

module.exports = UserPersonalData = mongoose.model('UserPersonalData', userpersonaldataSchema);