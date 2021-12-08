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
		const yearFilter = attend.filter((e)=> new Date(e.JourneyDate).getFullYear()== new Date(req.body.date).getFullYear()) 
		const MonthFilter = yearFilter.filter((e)=> new Date(e.JourneyDate).getMonth()+1 == new Date(req.body.date).getMonth()+1) 
		const DayFilter = MonthFilter.filter((e)=> new Date(e.JourneyDate).getDate() == new Date(req.body.date).getDate()) 
		
		if(DayFilter.length >= 1){
			let pryfilter = DayFilter.filter((e)=> e.JourneyId.JourneyPriority == req.body.code)
			
			if(pryfilter.length >= 1){
				// console.log('filt',pryfilter)
				
				res.status(200).json({
					status:'success',
					data:pryfilter
				})
			}else{
				res.status(404).json({
					status:'fail',
					message:`${journeyNamess(req.body.code)} Not attended on this Date`
				})
			}
		}else{
			
			res.status(404).json({
				status:'fail',
				message:'No attendance on this date'
			})
		}
	}
}