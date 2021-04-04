const User = require('../models/user/user')
const UserRole = require('../models/user/role')
const {
  errorResponse
} = require('../utils/responseHandler')

const ensureUserJobSeeker = async (req, res, next) => {

  if (!req.isAuthenticated()) {
    return errorResponse(res, [{
      msg: "Signed out, login again"
    }], 403)
  }


  // Todo admin and user securtiy check
  if (req.user.userrole.roletype !== 'A' && req.user.userrole.roletype !== 'U') {
    return errorResponse(res, [{
      msg: "Access is denied. You don't have permission."
    }], 403)
  }
  return next();
}

const ensureUserEmployer = async (req, res, next) => {

  if (!req.isAuthenticated()) {
    return errorResponse(res, [{
      msg: "Signed out, login again"
    }], 403)
  }

  if (req.user.userrole.roletype !== 'A' && req.user.userrole.roletype !== 'E') {
    return errorResponse(res, [{
      msg: "Access is denied. You don't have permission."
    }], 403)
  }
  return next();
}

const ensureAdmin = async (req, res, next) => {

  if (!req.isAuthenticated()) {
    return errorResponse(res, [{
      msg: "Signed out, login again"
    }], 403)
  }

  if (req.user.userrole.roletype !== 'A') {
    return errorResponse(res, [{
      msg: "Access is denied. You don't have permission."
    }], 403)
  }
  return next();
}


// Check if user logedin or not
const ensureAuthenticatedPassport = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return errorResponse(res, [{
    msg: "Access is denied. You don't have permission."
  }], 403)
}


const forwardAuthenticatedPassport = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  return errorResponse(res, [{
    msg: "You're already login."
  }], 403)
}

module.exports = {
  forwardAuthenticatedPassport,
  ensureAuthenticatedPassport,
  ensureUserJobSeeker,
  ensureUserEmployer,
  ensureAdmin

}