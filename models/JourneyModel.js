const mongoose = require('mongoose');

const journeySchema = mongoose.Schema({
    JourneyName:{
        type:String,
        required: true,
        trim: true
    },
    JourneyPriority:{
        type:Number,
        required: true
    },
   

})


module.exports = mongoose.model('journey',journeySchema);