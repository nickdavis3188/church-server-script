const jDate = require('../models/journeyDateModel')

exports.setJourneyDate = async(req,res,next)=>{
    try {
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
    } catch (error) {
        res.status(500).json({
            status:'fail',
            message:error
        })
    }
   
}

exports.journeyDateCheck = async (req,res,next)=>{
	try {
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
			}

			res.status(200).json({
                status:'success',
                message:'Date set...'
            })
			
		}
	} catch (error) {
		res.status(500).json({
			status:'fail',
			message:console.error()
		})
	}
	
} 