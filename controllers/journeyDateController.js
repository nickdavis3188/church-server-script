const jDate = require('../models/journeyDateModel')

exports.setJourneyDate = async(req,res,next)=>{
    try {
		const existingDate = await jDate.find({})
		if(existingDate.length == 0){
			const saveDate = await jDate.create({
            journeyDate:req.body.journeyDate
			})
			if(saveDate){
				res.status(200).json({
					status:'success',
					message:'Journey Date successfully set.'
				})
			}else{
				res.status(403).json({
					status:'fail',
					message:'Journey Date not set'
				})
			}
		}else{
			const updateJDate = await jDate.updateOne({_id:existingDate[0]._id},{$set:{journeyDate:req.body.journeyDate}})
				if(updateJDate.nModified ==1){
					res.status(200).json({
						status:'success',
						message:'Journey Date successfully set.'
					})
				}else{
					res.status(403).json({
						status:'fail',
						message:'Journey Date not set'
					})
				}
		}
        
    } catch (error) {
        res.status(500).json({
            status:'fail',
            message:error
        })
    }
   
}

exports.journeyDateCheck = async (req,res,next)=>{

	const journeyDate = await jDate.find({})

	if(journeyDate.length >= 1){
		const currentOrLastDate = journeyDate[ journeyDate.length -1 ]

		const journeyD = new Date(currentOrLastDate.createdAt).toLocaleDateString()
		const currentD = new Date().toLocaleDateString()

		if(currentD !== journeyD){
			res.status(404).json({
				status:'not found',
				message:'Journey Date Not Set'
			})
		}else{
			res.status(200).json({
				status:'success',
				message:'Date set...'
			})
		}	
	}else{
		res.status(404).json({
			status:'not found',
			message:'Journey Date Not Set'
		})
	}
	
	
} 