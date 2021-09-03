const mongoose = require('mongoose');
const journeyAttendanceSchema = mongoose.Schema({
    JourneyDate:{
      type:Date 
    }, 
    JourneyAtten:{
      type:String
    },
    MemberID: { type: mongoose.Schema.ObjectId, ref: 'Members' },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

journeyAttendanceSchema.pre(/^find/, function (next) {

    this.populate({
      path: 'MemberID',
      select: 'Firstname Surname ImageUrl _id',
    });
    next()
  });

module.exports = mongoose.model('attendance',journeyAttendanceSchema);