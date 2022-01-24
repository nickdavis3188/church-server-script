const JourneyAttendanceModel = require('../models/journeyAttendanceModel');
const journeyNamess = (num)=>{
	let name = ''
	if(num == 1){
		name = 'Journey101'
	}else if(num == 2){
		name = 'Journey201'
	}else if(num == 3){
		name = 'journey202'
	}else if(num == 4){
		name = 'Journey301'
	}else if(num == 5){
		name = 'Journey401'
	}
	else{
		name = 'not a number'
	}
	return name
}
exports.getReport = async (req,res,next)=>{
	const attend = await JourneyAttendanceModel.find({})
	.populate('MemberId')
	.populate('JourneyId')
	.populate('AdminId')
		
	
	if(attend.length >= 1){
		// console.log(attend)
		// const jIdFilter = attend.filter((e)=> e.MemberId )
		// const yearFilter = attend.filter((e)=> new Date(e.JourneyDate).getFullYear()== req.body.date)
		
		let yearFilter = [];
		
		for(let i = 0; i < attend.length; i++){
			if(new Date(attend[i].JourneyDate).getFullYear() == req.body.date){
				yearFilter.push(attend[i])
			}
		}
		
		if(yearFilter.length >= 1){
			// let pryfilter = yearFilter.filter((e)=> e.JourneyId.JourneyPriority == req.body.code)
			
			let journeyFilter = [];
			
			for(let v = 0; v < yearFilter.length; v++){
				if(yearFilter[v].JourneyId.JourneyPriority == req.body.code){
					journeyFilter.push(yearFilter[v])
				}
			}
			
			if(journeyFilter.length >= 1){
				// console.log('filt',pryfilter)
				
				res.status(200).json({
					status:'success',
					data:journeyFilter
				})
			}else{
				res.status(404).json({
					status:'fail',
					message:`${journeyNamess(req.body.code)} Not attended on this Year`
				})
			}
			
		}else{
			res.status(404).json({
				status:'fail',
				message:'No attendance on this year'
			})
		}
	}
}
