const mongoose = require('mongoose');
const url = require("../host")

const buldUploadSchema = mongoose.Schema({
    fileName:{
        type:String,
        required: true,
    },
    url:{
        type:String,
        required: true,
    },
    dateUpload:String

})

buldUploadSchema.pre('save',(next)=>{
    this.dateUpload = new Date().toUTCString()
    next()
})
module.exports = mongoose.model('bulkUpload', buldUploadSchema);