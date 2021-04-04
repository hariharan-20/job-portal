const multerErrorHandling=(error, req, res, next) => {
    res.status(500).json({error:{
        message:'Something Went wrong. Please upload an image with size 1mb with either jpg or jpeg or png format'
    } });
  }

module.exports={multerErrorHandling}