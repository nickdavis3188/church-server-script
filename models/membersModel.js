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
	
    PhoneNo:String,
	
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

	Primary:{
		type:String,
		trim:true
	},

    currentJourney: {type:mongoose.Schema.Types.ObjectId,ref:"journey"},

    nextJourney:{type:mongoose.Schema.Types.ObjectId,ref:"journey"},
	
	SincurrentJourney: {type:mongoose.Schema.Types.ObjectId,ref:"journey"},
    SinnextJourney:{type:mongoose.Schema.Types.ObjectId,ref:"journey"},
	
    journeyAttend:[{type:mongoose.Schema.Types.ObjectId,ref:"attendance"}],
	
	memberStatus:{
      type: String,
      enum: ['new','Repeated'],
      default: 'new'
    },
   
    // password:String,
    monthCreated:Number,
    Year:Number,
  },{ timestamps: true });

	memberSchema.post('find', async function(docs) {
	  for (let doc of docs) {
  		if (doc.isPublic) {
  		  await doc.populate('currentJourney')
  		}
	  }
	});
	//
  memberSchema.pre('save', function (next) {
    // this.password = this.Surname;
    this.monthCreated =  new Date().getMonth() +1 ;
    this.Year =  new Date().getFullYear();
    this.role = 'member'
    next();
  });

module.exports = mongoose.model('Members', memberSchema);
