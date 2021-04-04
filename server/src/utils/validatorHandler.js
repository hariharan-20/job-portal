const {
    errorResponse
} = require('../utils/responseHandler')
const {
    validationResult
} = require('express-validator');


const isValid = (req) => {
    const errors = validationResult(req);
    return errors.isEmpty();
};

const validateRequestHandler = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, [errors.mapped()]);
    }
};

module.exports = {
    isValid,
    validateRequestHandler
}