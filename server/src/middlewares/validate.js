const {
    validateRequestHandler,
    isValid
} = require('../utils/validatorHandler');

const forceValidate = async (req, res, next) => {
    // Validate Data
    if (!isValid(req)) return validateRequestHandler(req, res);

    next()
}


module.exports = {
    forceValidate
}