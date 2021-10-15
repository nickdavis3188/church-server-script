const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const url = require('../host')

const adminShema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    photoUrl: {
        type: String,
      },
    email: {
        type: String,
        required: true,
        unique: true,
        //An alternative to regex to perform email validation
        validate: [validator.isEmail, 'Please Provide a valid email'],
    },
    
      password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, 'A password should be at least 8 characters'],
      },
    
      passwordConfirm: {
        type: String,
        //required: true,
        validate: {
          validator: function (el) {
            // This only works on CREATE and SAVE!!!
            return el === this.password;
          },
    
          message: 'Passwords are not the same!',
        }
      },
	  
      role: {
        type: String,
        enum: ['admin','sub-admin','member'],
        default: 'admin',
      },
	  
	  isArchive: {
        type: String,
        enum: ['unarchive','archive'],
        default: 'unarchive',
      },
	  
      lastLoginTime: Date,
      lastLogoutTime: Date,
      passwordChangedAt: Date,
     
   
  },{ timestamps: true });

//DOCUMENT MIDDLEWARE
adminShema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    //Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    //Delete the passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });


//INSTANCE METHODS
adminShema.statics.correctPassword = async function (
  inputedPassword,
  userPassword
) {
  return await bcrypt.compare(inputedPassword, userPassword);
};

adminShema.statics.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

module.exports = mongoose.model('admin', adminShema,'admin');