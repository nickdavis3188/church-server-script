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
	  trim:true
    },
    RegNumber: {
      type:String,
	  trim:true
    },
    PhoneNo:Number,
    Sex: {
        type:String,
        trim:true
    },

    Dob:Date,

    MaritalStatus: {
      type: String,
	  trim:true
    },

    WeddingAnniversary:Date,

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
    DateJoinedTKA:Date,   
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
    this.monthCreated =  new Date().getMonth() +1 ;
    this.Year =  new Date().getFullYear();
    this.role = 'member'
    next();
  });

module.exports = mongoose.model('Members', memberSchema);