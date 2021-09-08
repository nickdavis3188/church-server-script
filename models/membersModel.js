const mongoose = require('mongoose');
const url = require("../host")
const JourneyModel = require('../models/JourneyModel')

const memberSchema = mongoose.Schema(
  {
    
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
   currentJourney: {type:mongoose.Schema.Types.ObjectId,ref:"journey"},
    nextJourney:{type:mongoose.Schema.Types.ObjectId,ref:"journey"},
    journeyAttend:[{type:mongoose.Schema.Types.ObjectId,ref:"attendance"}],
    memberStatus:String,
    password:String,
    monthCreated:Number,
    Year:Number,
  },{ timestamps: true });

  memberSchema.pre('save', function (next) {
    this.password = this.Surname;
    this.monthCreated =  new Date().getMonth();
    this.Year =  new Date().getFullYear();
    this.role = 'member'
    next();
  });

module.exports = mongoose.model('Members', memberSchema);