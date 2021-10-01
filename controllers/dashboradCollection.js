const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
//const dashFilter = require('../utils/memberDashboradFilter');
const Member = require('../models/membersModel');

//statistics function
const dashboradFilter = (yearFilterdData,selectedYear)=>{

	var totalMalePreMonth = []
	var totalFemalePreMonth = []
	
	
	
	const femaleJan = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==1)
	const femaleFeb = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==2)
	const femaleMac = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==3)
	const femaleApl = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==4)
	const femaleMy = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==5)
	const femaleJn = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==6)
	const femaleJl = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==7)
	const femaleAug = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==8)
	const femaleSep = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==9)
	const femaleOct = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==10)
	const femaleNov = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==11)
	const femaleDec = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=> e.monthCreated ==12)
	
	//male
	const maleJan = yearFilterdData.filter((e)=> e.Sex =='Male'|| e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==1)
	const maleFeb = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==2)
	const maleMac = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==3)
	const maleApl = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==4)
	const maleMy = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==5)
	const maleJn = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==6)
	const maleJl = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==7)
	const maleAug = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==8)
	const maleSep = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==9)
	const maleOct = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==10)
	const maleNov = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==11)
	const maleDec = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=> e.monthCreated ==12)
	
	//male
	totalMalePreMonth.push((maleJan.length !== 0?maleJan.length:0))
	totalMalePreMonth.push((maleFeb.length !== 0?maleFeb.length:0))
	totalMalePreMonth.push((maleMac.length !== 0?maleMac.length:0))
	totalMalePreMonth.push((maleApl.length !== 0?maleApl.length:0))
	totalMalePreMonth.push((maleMy.length !== 0?maleMy.length:0))
	totalMalePreMonth.push((maleJn.length !== 0?maleJn.length:0))
	totalMalePreMonth.push((maleJl.length !== 0?maleJl.length:0))
	totalMalePreMonth.push((maleAug.length !== 0?maleAug.length:0))
	totalMalePreMonth.push((maleSep.length !== 0?maleSep.length:0))
	totalMalePreMonth.push((maleOct.length !== 0?maleOct.length:0))
	totalMalePreMonth.push((maleNov.length !== 0?maleNov.length:0))
	totalMalePreMonth.push((maleDec.length !== 0?maleDec.length:0))
	
	//female
	totalFemalePreMonth.push((femaleJan.length !== 0?femaleJan.length:0))
	totalFemalePreMonth.push((femaleFeb.length !== 0?femaleFeb.length:0))
	totalFemalePreMonth.push((femaleMac.length !== 0?femaleMac.length:0))
	totalFemalePreMonth.push((femaleApl.length !== 0?femaleApl.length:0))
	totalFemalePreMonth.push((femaleMy.length !== 0?femaleMy.length:0))
	totalFemalePreMonth.push((femaleJn.length !== 0?femaleJn.length:0))
	totalFemalePreMonth.push((femaleJl.length !== 0?femaleJl.length:0))
	totalFemalePreMonth.push((femaleAug.length !== 0?femaleAug.length:0))
	totalFemalePreMonth.push((femaleSep.length !== 0?femaleSep.length:0))
	totalFemalePreMonth.push((femaleOct.length !== 0?femaleOct.length:0))
	totalFemalePreMonth.push((femaleNov.length !== 0?femaleNov.length:0))
	totalFemalePreMonth.push((femaleDec.length !== 0?femaleDec.length:0))

	if(selectedYear == new Date().getFullYear()){
		let sli = new Date().getMonth()
		let finalMale = totalMalePreMonth.slice(0,sli + 1)
		let finalFemale = totalFemalePreMonth.slice(0,sli + 1)
		console.log('as',{male:finalMale,female:finalFemale})
		return {male:finalMale,female:finalFemale}
	}
	console.log('bs',{male:totalMalePreMonth,female:totalFemalePreMonth})
	return {Male:totalMalePreMonth,Female:totalFemalePreMonth}
}
				




//static
exports.dashboarStatic =((req, res, next) => {
   //const staticM = await Member.find({});
   Member.find()
   .exec()
   .then((memsData)=>{
	   if(memsData.length >= 1){
			//console.log(memsData)	
			let male = [];
			let female = [];
			//console.log(data)
			
			for(let i = 0; i < memsData.length; i++){
				if(memsData[i].Sex == 'Male'){
					male.push(memsData[i])
				//console.log(data[i])
				}
			}
			// female
			for(let i = 0; i < memsData.length; i++){
				if(memsData[i].Sex == 'Female'){
					female.push(memsData[i])
				//console.log(data[i])
				}
			}
			//total
			let mNum = male.length
			let fNum = female.length
			let totNum = memsData.length
			
			let dd = {male:mNum ,female:fNum,total:totNum}
			console.log(dd)
			
			res.status(200).json({
				status:'success',
				data:dd
			})		
		}
   })	
   // .catch((err)=>{
	   // res.status(500).json({
		   // status:'fail',
		   // data:err
		// })
   // })
    
   
})


// statisticsDashborad
exports.statisticsDashborad = (req, res, next) => {
   
	//console.log(req.body.ya)
	 Member.find({Year:req.body.ya})
	.exec()
	.then((memsData)=>{
		if(memsData.length >= 1){
			//console.log(memsData)
			let maindd = dashboradFilter(memsData,req.body.ya)
			console.log('dsh',maindd)
			res.status(200).json({
				status:'success',
				data:maindd
			})	
		}
		
	})
	// .catch((err)=>{
	   // res.status(500).json({
		   // status:'fail',
		   // data:err
		// })
   // })
	//console.log(memsData)
		 
}
