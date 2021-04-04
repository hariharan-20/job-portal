const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = Schema({
    name: {
        type: String,
    },
    // addedby: {
    //     type: String
    // }
}, {
    timestamps: true
})

module.exports = Skill = mongoose.model('Skill', skillSchema);