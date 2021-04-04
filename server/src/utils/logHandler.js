const Log = require('../models/log/log')

const logerror = (location, msg, description = "") => {
    let log = new Log()
    log.location = location
    log.msg = msg
    log.description = description
    try {
        await log.save()
    } catch (e) {
        // Mail the error to the developer account
    }
}

module.exports = {
    logerror
}