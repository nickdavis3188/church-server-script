const JourneyModel = require('../models/JourneyModel');
const journeyModel = require('../models/JourneyModel');

exports.journeyRegistration = async (req,res,next)=>{
    try{
       // console.log(req.body)
       const registerJ = await journeyModel.create({
            JourneyName:req.body.JourneyName,
            JourneyPriority:req.body.JourneyPriority
        })
        if(registerJ){
            res.status(200).json({
                status:'success',
                message:'Journey Registration Successful'
            })
        }
    }catch(err){
        if(err){
            res.status(500).json({
                status:'fail',
                message:err
            })
        }
    }
}

exports.updateJourney = async (req,res,next)=>{
    let {id} = req.params
    let {JourneyName,JourneyPriority} = req.body
    try {
        if(JourneyName || JourneyPriority){
            const findJ = await JourneyModel.find({_id:id})
            if(findJ.length >= 1){
                console.log(findJ)
                if(req.body.JourneyPriority && req.body.JourneyName){
                    const updateJ = await JourneyModel.updateOne({_id:findJ[0]._id},{$set:{JourneyName:JourneyName,JourneyPriority:JourneyPriority}})
                    if(updateJ.nModified === 1){
                        console.log(updateJ)
                        res.status(200).json({
                            status:"success",
                            message:"JourneyUpdate successful"
                        })
                    }else{
                        req.status(300).json({
                            status:"fail",
                            message:"Not Modefied"
                        })
                    }
                }
                else if(req.body.JourneyPriority && !req.body.JourneyName){
                    const updateJ1 = await JourneyModel.updateOne({_id:findJ[0]._id},{$set:{JourneyPriority:JourneyPriority}})
                    if(updateJ1.nModified === 1){
                        console.log(updateJ1)
                        res.status(200).json({
                            status:"success",
                            message:"JourneyUpdate successful"
                        })
                    }else{
                        req.status(300).json({
                            status:"fail",
                            message:"Not Modefied"
                        })
                    }
                }else{
                    const updateJ2 = await JourneyModel.updateOne({_id:findJ[0]._id},{$set:{JourneyName:JourneyName}})
                    if(updateJ2.nModified === 1){
                        console.log(updateJ2)
                        res.status(200).json({
                            status:"success",
                            message:"JourneyUpdate successful"
                        })
                    }else{
                        req.status(300).json({
                            status:"fail",
                            message:"Not Modefied"
                        })
                    }
                }
            }else{
                res.status(404).json({
                    status:"fail",
                    message:"Journey not found"
                })
            }
        }else{
            res.status(404).json({
                status:"fail",
                message:"Values not provided"
            })
        }
    } catch (error) {
        if(error){
            res.status(500).json({
                status:"fail",
                message:error
            })
        }
    }
}