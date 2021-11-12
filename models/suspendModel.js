const mongoose = require('mongoose');

const suspendShema = mongoose.Schema({
	    Member: {type:mongoose.Schema.Types.ObjectId,ref:"Members"},
	    journeyAttend: [{type:mongoose.Schema.Types.ObjectId,ref:"attendance"}],
      Reason: {type:Number,}
  },{ timestamps: true });

module.exports = mongoose.model('suspend', suspendShema);
