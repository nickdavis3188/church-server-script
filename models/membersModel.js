const mongoose = require('mongoose');
const url = require("../host")

const memberSchema = mongoose.Schema(
  {
    MemberID:String,
    
    Firstname: {
      type: String,
      trim: true
    },

    Surname: {
      type:String,
      trim:true
    },
    Email: {
      type:String,
      trim:true
    },
    Address: {
      type:String,
	  trim:true
    },
    ImageUrl:{
      type:String,
      default:`${url}/public/img/members/default.jpg`
    },
    RegNumber: {
      type:String,
	  trim:true
    },
    PhoneNo: {
      type:Number,
      
    },
    Sex: {
        type:String,
        trim:true
    },

    Dob: {
      type:Date,
    },

    MaritalStatus: {
      type: String,
    },

    WeddingAnniversary: {
      type:Date,
    },

    Occupation: {
      type: String,
	  trim:true
    },
    Business: {
      type:String,
	  trim:true
     
    },

    Expertise: {
      type:String,
	  trim:true
    },

    MemberTypeName: {
      type:String,
	  trim:true
    },
    Status: {
      type:String,
	  trim:true
    },
    DateJoinedTKA: {
      type:Date
    },
    ALTDate: {
      type:Date
    },
    MinistryID1: {
      type:String,
	  trim:true
    },
    MinistryID2: {
      type:String,
	  trim:true
    },
    MinistryID3: {
      type:String,
	  trim:true
    },
    role: {
      type: String,
      enum: ['admin','sub-admin','member'],
      default: 'member',
    },
   currentJourney: {
      type: String,
      enum: ['Journey 101','Journey 201','Journey 202','Journey 301','Journey 401'],
      default: 'Journey 101',
    },
    nextJourney:String,
    journeyAttend:[{type:mongoose.Schema.Types.ObjectId,ref:"attendance"}],
    memberStatus:String,
    password:String,
    monthCreated:Number,
    Year:Number,
    timeStamp:Date,
   // lastLoginTime: Date,
  //  lastLogoutTime: Date,
  //  passwordChangedAt: Date,
  //  passwordResetCode: Number,
  //  passwordResetExpires: Date,
  //  passwordRE: Number,
  });

  memberSchema.pre('save', function (next) {
    this.password = this.Surname;
    this.monthCreated =  new Date().getMonth();
    this.Year =  new Date().getFullYear();
    this.timeStamp = Date.now() - 1000;
    this.currentJourney = 'Journey 101'
    this.role = 'member'
    this.nextJourney = 'Journey 201'
    next();
  });

module.exports = mongoose.model('Members', memberSchema);