const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const signToken = require('../utils/signToken');
const Email = require('../utils/email');
const Member = require('../models/membersModel');
const AdminModel = require('../models/adminModel');
const crypto = require('crypto');
const multer = require('multer');
const jwt = require("jsonwebtoken")
// const url = require('../host')

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  //Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

const onlyAdminPermitted = (role) => {
  if (role !== 'admin' ){//|| role == 'SR' || role == 'CST'
    return false
  }
  return true
}


//////////////////////////////////Multer config//////////

const storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./publicFile/admin/');
	},
	filename:function(req,file,cb){
		cb(null,new Date().getFullYear()+file.originalname);
	}
})

const fileFilter = (req,file,cb)=>{
	if(file.mimetype.startsWith('image')){
		cb(null,true)
	}else{
		cb(new AppError('Not an image! Please upload only images', 400),false)
	}
}

exports.upload = multer({storage:storage,fileFilter:fileFilter})

//////////////////////////////////////////////

//Code to resize image and store as jpg
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


//Code for user signup
exports.signup = async (req, res, next) => {
  const userData = { ...req.body };

  let { fullName, email, password, passwordConfirm} = userData;

	//console.log(req.body)
	 try{
		 
		  // check if user with the same email allready exit
		  const adminExists = await AdminModel.exists({ email });
		  //const memberExists = await Member.exists({ email });


		  if (adminExists) {
			return res.status(400).json({
			  message: 'User already exists',
			});
		  }

		 if(req.file){
			const newUser = await AdminModel.create({
				fullName,
				email,
				password,
				passwordConfirm,
				role:'sub-admin',
				photoUrl:`${req.protocol}://${req.get('host')}/publicFile/admin/${req.file.filename}`
			  })
			  
			  console.log(newUser)
			  
			  res.status(200).json({
				   status:'success',
				   data:newUser
			   }) 
		 }else{
			const newUser2 = await AdminModel.create({
				fullName,
				email,
				password,
				passwordConfirm,
				role:'sub-admin',
				photoUrl:`${req.protocol}://${req.get('host')}/publicFile/admin/default.jpg`
			})
			  
			console.log(newUser2)
			  
			res.status(200).json({
				   status:'success',
				   data:newUser2
			})
		}
		 
	}catch (error) {
		res.status(500).json({
			   status:'fail',
			   data:error
		   })
	}
 

  


  // const url = `${req.protocol}://${req.get('host')}/me`;
  // await new Email(newUser).sendWelcome();

  
};


//Code for user login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
	try{
		 
		  //1) check if email or password was passed in
		  if (!email || !password) {
			  res.status(400).json({
				   status:'not found',
				   message:'Please Provide email and password!'
			   })
			
		  }

		  //2) Check if  user exists && password is correct
		  let admin = await AdminModel.findOne({ email }).select('+password');

		  if (!admin) {
			  return next(new AppError('No User with that email',404))
			 
		  }

		  //Check if inputed password is correct

		  const correct = await AdminModel.correctPassword(password, admin.password);

		  if (!correct) {
			  return next(new AppError('Incorrect email or password',401))
			 
		   
		  }

		  // Update last login time
		  admin.lastLoginTime = new Date();
		  admin.lastLogoutTime = null;
		  await admin.save()
			
	   const tokenm = await jwt.sign({
			 userId:admin._id,
			 userName:admin.fullName,
			 isAdmin:admin.role
		 },"davisSecret",
		 {
			 expiresIn:"24h"
		 })
		 
		 res.status(500).json({
			    status: 'success',
			   token:tokenm
			})
			
		  //3) If everything is ok, send token to client
		 // createSendToken(admin, 200, res);
	}catch (error) {
		if(error){
			res.status(500).json({
			   status:'fail',
			   data:error
			})
		}
		
	}

});

// User logout
exports.logout = catchAsync(async (req, res, next) => {
	try{
		let user = await AdminModel.findById(req.user.id)
		user.lastLogoutTime = new Date();
		user.save()
		res.status(200).json({
			status:'success',
			message:'signout successfull'
		})
	}catch (error) {
		res.status(500).json({
			   status:'fail',
			   data:error
		   })
	}
 
});


exports.cheackLog = catchAsync(async (req,res,nex)=>{
	try{
		const getUser = await AdminModel.findById(req.user.id)
		if(getUser){
			res.status(200).json({
				status:'success',
				data:getUser
			})
		}
	}catch (error) {
		res.status(500).json({
		   status:'fail',
		   data:error
	    })
	}
	
})

exports.protect = catchAsync(async (req, res, next) => {
  // //1) Getting token and check if its there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
     //console.log(req.headers.authorization)
    //token = req.headers.authorization.slice(6)
    token = req.headers.authorization.split(' ')[1];
  }
	try{
		 //2) Validate token
		if (!token) {
			return next(
			 res.status(401).json({
				   status:'fail',
				   message:'You are not logged in! Please login to get access'
			  })
			
			);
		  }

		 // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
		 const decoded = await jwt.verify(token,"davisSecret");
		//console.log(decoded)
		  //3) Check if user still exists
		  const currentUser = await AdminModel.findById(decoded.userId);
		  //console.log(currentUser)
		  if (!currentUser) {
			return next(
			 res.status(401).json({
				   status:'fail',
				   message:'The user belonging to the token no longer exists.'
			   })
			  
			);
		  }

		  //4) Check if user changed password after jwt was issued
		//  if (AdminModel.changedPasswordAfter(decoded.iat)) {
		//	return next(new AppError('User recently changed password! Please login  again',401)) 
		 // }

		  // GRANT ACCESS TO ROUTE
		  req.user = currentUser;
		//console.log('protrect');
		  next();
	}catch (error) {
		res.status(500).json({
		   status:'fail',
		   data:error
	    })
	}
 
});

//Access Control
exports.accessControl = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'sub-admin') {
    return next();
  }
  
  return next(new AppError('Only Admins can do this', 403));
});


//Code for forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on posted email
  const { email,host } = req.body;
  try {
	  const user99 = await AdminModel.findOne({ email });

	  if (!user99) {
		   res.status(404).json({
			   status:'fail',
			   message:'There is no user with that email'
		   }
	   
	  }
	  
	  let resetLink = `${host}/${user99._id}`

    //send reset code through email
    await new Email(user99, resetLink).sendPasswordReset();

    user99.passwordResetCode = resetCode;
    user99.passwordRE = Date.now() + 60 * 10000;
    user99.passwordResetExpires = Date.now() + 60 * 10000;
    await user99.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      message:
        'Reset Link has been sent to your Email address, check your inbox',
    });
  } catch (error) {
    if (error) {
      user99.createPassswordResetCode = undefined;
      user99.passwordResetExpires = undefined;
      await user99.save({ validateBeforeSave: false });
		 res.status(500).json({
		   status:'fail',
		   message:'There was an error sending the email. Try again later!',
		   error
	   })
      
    }
  }
});

//confirm password reset code
// exports.confirmResetCode = catchAsync(async (req, res, next) => {
	// try{
		// check if the code exist
		  // const user = await AdminModel.findOne({
			// passwordResetCode: req.params.code,
			// passwordRE: { $gt: Date.now() },
		  // });

		  //2) If token  has not expired, and there is user, set new password
		  // if (!user) {
			   // res.status(400).json({
				   // status:'fail',
				   // message:'Reset code is invalid or has expired'
			   // })
		 
		  // }

		  //GIVE PREMISION
		  // res.status(200).json({
			// status: 'success',
			// message: 'Reset code is valid',
			// passwordResetCode: req.params.code,
		  // });
	// }catch (error) {
		// res.status(500).json({
		   // status:'fail',
		   // data:error
	    // })
	// }
 
// });

//Code to reset User password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Update changedPasswordAt property for the user
  const {id} = req.params;
  const { password, passwordConfirm } = req.body;
  try{
	   const mainUser = await AdminModel.findOne({_id:id});
	  if (mainUser) {
		if (passwordConfirm && password) {
		  mainUser.password = password;
		  mainUser.passwordConfirm = passwordConfirm;
		  await mainUser.save();

		  // Log the user in, send JWT to the client
		   const tokenm1 = await jwt.sign({
			 userId:mainUser._id,
			 userName:mainUser.fullName,
			 isAdmin:mainUser.role
			 },"davisSecret",
			 {
				 expiresIn:"24h"
		   })
		   
		    res.status(statusCode).json({
				status: 'success',
				tokenm1
		    });
		  
		} else {
			 res.status(400).json({
			   status:'fail',
			   message:'password and passwordConfirm cant be empty, pleass set your password'
		   })
		 
		}
	  } else {
		   res.status(400).json({
			   status:'fail',
			   message:'Error #U404R: sorry something went wrong, if this contenue pls contact the customer care'
		   })
		
	  }
  }catch (error) {
		res.status(500).json({
		   status:'fail',
		   data:error
	    })
	}
 
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  try{
	   //1) Get user from collection
	  const user = await AdminModel.findById(req.user.id).select('+password');
	  // console.log(user);
	  //2) Check if posted password is correct
	  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		   res.status(401).json({
			   status:'fail',
			   message:'Your current password is wrong'
		   })
		
	  }

	  //3) If so, update password
	  user.password = req.body.password;
	  user.passwordConfirm = req.body.passwordConfirm;
	  await user.save();

	  //4) Log user in, send JWT
	  createSendToken(user, 200, res);
	  
  }catch (error) {
		res.status(500).json({
		   status:'fail',
		   data:error
	    })
	}
 
});



exports.inviteAdmin = catchAsync(async (req, res, next) => {
  const userData = { ...req.body };
  const { fullName, email, password, passwordConfirm } = userData;
  try{
		const role = 'sub-admin'
	  const adminExists = await AdminModel.exists({ email, role });

	  if (adminExists) {
		return res.status(400).json({
		  message: 'Admin already exists',
		});
	  }

	  const newAdmin = await AdminModel.create({
		fullName,
		email,
		password,
		passwordConfirm,
		role,
	  });
	  await new Email(newAdmin).sendWelcome();
	  createSendToken(newAdmin, 201, res);
	  
  }catch (error) {
		res.status(500).json({
		   status:'fail',
		   data:error
	    })
	}

})
