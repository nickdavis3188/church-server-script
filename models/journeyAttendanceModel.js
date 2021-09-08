const mongoose = require('mongoose');
const journeyAttendanceSchema = mongoose.Schema({
    JourneyDate:{
      type:Date 
    }, 
    JourneyId:{
       type: mongoose.Schema.ObjectId,
       ref: 'journey'
   },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// journeyAttendanceSchema.pre(/^find/, function (next) {

//     this.populate({
//       path:'MemberID',
//       select: 'Firstname Surname ImageUrl _id',
//     });
//     next()
//   });

  // Author.
  // findOne().
  // populate({
  //   path: 'posts',
  //   populate: {
  //     path: ' JourneyId'
  //   }
  // }).
  // exec
module.exports = mongoose.model('attendance',journeyAttendanceSchema);