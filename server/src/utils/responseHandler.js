const successResponse = async (res, data, statusCode = null, message = null) => {
    // let payload = [];
    // if (data) {
    //     payload = [
    //         ...payload,
    //         ...data
    //     ];
    // }
    // if (message) {
    //     payload = {
    //         ...payload,
    //         message
    //     };
    // }
    if (statusCode) return res.status(statusCode).json(data);
    else return res.status(200).json(payload);
}

const errorResponse = async (res, errorMessage = [], statusCode = null) => {
    let payload = {};
    let errors = {};

    try {
        errorMessage.forEach((error) => {
            errors = {
                ...errors,
                ...error
            };
        });
    } catch (e) {
        // Internal Server Error
        // Error due to conflict in data type or data structure
    }


    if (statusCode >= 500) {
        errors = {
            ...errors,
            server: "Internal Server Error!"
        };
    }
    payload = {
        errors: {
            ...errors
        }
    };

    if (statusCode) return res.status(statusCode).json(payload);
    else return res.status(400).json(payload);
}


module.exports = {
    successResponse,
    errorResponse
}