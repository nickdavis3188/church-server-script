const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Admin = require('../models/adminModel');



// profile
exports.getSingleDetails = catchAsync(async (req, res, next) => {
      const {user} = req
      const userDitails = await Admin.findOne({email:user.email})
      if(userDitails){
        res.status(200).json({
          status:"success",
          data: userDitails
        })
      }

});


