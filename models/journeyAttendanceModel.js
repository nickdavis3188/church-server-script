const mongoose = require('mongoose');
const journeyAttendanceSchema = mongoose.Schema({
    MemberId:{
         type: mongoose.Schema.ObjectId,
         ref: 'Members'
     },
    JourneyDate:{
      type:Date
    },
    JourneyId:{
       type: mongoose.Schema.ObjectId,
       ref: 'journey'
   },
   Status:{
      type: String,
      enum: ['New','Repeated'],
      default: 'New'
    },
	AdminId:{
       type: mongoose.Schema.ObjectId,
       ref: 'admin'
   },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});


module.exports = mongoose.model('attendance',journeyAttendanceSchema);
