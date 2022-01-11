const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
//const dashFilter = require('../utils/memberDashboradFilter');
const Member = require('../models/membersModel');
const _ = require('underscore');
//statistics function
const dashboradFilter = (data,selectedYear)=>{

	var totalMalePreMonth = []
	var totalFemalePreMonth = []
	
	const yearFilterdData = data.filter((e)=> new Date(e.DateJoinedTKA).getFullYear() == selectedYear)
	
	//female
	const femaleJan = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==1:'')
	const femaleFeb = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==2:'')
	const femaleMac = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==3:'')
	const femaleApl = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==4:'')
	const femaleMy = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==5:'')
	const femaleJn = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==6:'')
	const femaleJl = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==7:'')
	const femaleAug = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==8:'')
	const femaleSep = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==9:'')
	const femaleOct = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==10:'')
	const femaleNov = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==11:'')
	const femaleDec = yearFilterdData.filter((e)=> e.Sex =='Female' || e.Sex =='female' || e.Sex =='FEMALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==12:'')

	//male
	const maleJan = yearFilterdData.filter((e)=> e.Sex =='Male'|| e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==1:'')
	const maleFeb = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==2:'')
	const maleMac = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==3:'')
	const maleApl = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==4:'')
	const maleMy = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==5:'')
	const maleJn = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1==6:'')
	const maleJl = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==7:'')
	const maleAug = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==8:'')
	const maleSep = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==9:'')
	const maleOct = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==10:'')
	const maleNov = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==11:'')
	const maleDec = yearFilterdData.filter((e)=> e.Sex =='Male' || e.Sex =='male' || e.Sex =='MALE').filter((e)=>e.DateJoinedTKA?new Date(e.DateJoinedTKA).getMonth()+1 ==12:'')

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
		// console.log('as',{male:finalMale,female:finalFemale})
		return {male:finalMale,female:finalFemale}
	}
	// console.log('bs',{male:totalMalePreMonth,female:totalFemalePreMonth})
	return {Male:totalMalePreMonth,Female:totalFemalePreMonth}
}
				
function filterAttendance(data,selectedYear){
	
	var journey101 = []
	var journey201 = []
	var journey202 = []
	var journey301 = []
	var journey401 = []
	// console.log('year',selectedYear)
	const dateFiltrer = data.filter((e)=> new Date(e.createdAt).getFullYear() == selectedYear)
	// console.log('mem',dateFiltrer)
	
	const attendFilter = dateFiltrer.filter((e)=> e.journeyAttend.length >= 1)
	// console.log('memAttend',attendFilter)
	
    const iu =  _.pluck(attendFilter,"journeyAttend")
	
    const iu2 =  _.pluck(iu,"JourneyId")
	
	////////////////////////////////////////////Journey 101 /////////////////////////
	let arrrM1 = []
	let arrrM2 = []
	let arrrM3 = []
	let arrrM4 = []
	let arrrM5 = []
	let arrrM6 = []
	let arrrM7 = []
	let arrrM8 = []
	let arrrM9 = []
	let arrrM10 = []
	let arrrM11 = []
	let arrrM12 = []
	
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 1  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM1.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 2  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM2.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 3  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM3.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 4  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM4.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 5  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM5.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 6  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM6.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 7  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM7.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 8  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM8.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 9  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM9.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 10  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM10.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 11  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM11.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 12  && iu[i][k].JourneyId.JourneyPriority == 1 ){
				arrrM12.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////////////////////////////Journey 201//////////////////////////////////////////////////////////
	
	let arrr2M1 = []
	let arrr2M2 = []
	let arrr2M3 = []
	let arrr2M4 = []
	let arrr2M5 = []
	let arrr2M6 = []
	let arrr2M7 = []
	let arrr2M8 = []
	let arrr2M9 = []
	let arrr2M10 = []
	let arrr2M11 = []
	let arrr2M12 = []
	
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 1  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M1.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 2  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M2.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 3  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M3.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 4  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M4.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 5  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M5.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 6  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M6.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 7  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M7.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 8  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M8.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 9  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M9.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 10  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M10.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 11  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M11.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 12  && iu[i][k].JourneyId.JourneyPriority == 2 ){
				arrr2M12.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	
	//////////////////////////////////////Journey 202 ///////////////////////
	
	let arrr3M1 = []
	let arrr3M2 = []
	let arrr3M3 = []
	let arrr3M4 = []
	let arrr3M5 = []
	let arrr3M6 = []
	let arrr3M7 = []
	let arrr3M8 = []
	let arrr3M9 = []
	let arrr3M10 = []
	let arrr3M11 = []
	let arrr3M12 = []
	
	
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 1  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M1.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 2  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M2.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 3  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M3.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 4  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M4.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 5  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M5.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 6  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M6.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 7  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M7.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 8  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M8.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 9  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M9.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 10  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M10.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 11  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M11.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 12  && iu[i][k].JourneyId.JourneyPriority == 3 ){
				arrr3M12.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////////////////////////////Journey 301 ///////////////////
	
	let arrr4M1 = []
	let arrr4M2 = []
	let arrr4M3 = []
	let arrr4M4 = []
	let arrr4M5 = []
	let arrr4M6 = []
	let arrr4M7 = []
	let arrr4M8 = []
	let arrr4M9 = []
	let arrr4M10 = []
	let arrr4M11 = []
	let arrr4M12 = []
	
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 1  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M1.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 2  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M2.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 3  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M3.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 4  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M4.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 5  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M5.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 5  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M5.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 6  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M6.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 7  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M7.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 8  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M8.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 9  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M9.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 10  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M10.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 11  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M11.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 12  && iu[i][k].JourneyId.JourneyPriority == 4 ){
				arrr4M12.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////////////////////Journey 401 /////////////////
	
	let arrr5M1 = []
	let arrr5M2 = []
	let arrr5M3 = []
	let arrr5M4 = []
	let arrr5M5 = []
	let arrr5M6 = []
	let arrr5M7 = []
	let arrr5M8 = []
	let arrr5M9 = []
	let arrr5M10 = []
	let arrr5M11 = []
	let arrr5M12 = []
	
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 1  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M1.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 2  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M2.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 13&& iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M3.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 4  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M4.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 5  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M5.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 6  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M6.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	//////////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 7  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M7.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 8  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M8.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	///////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 9  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M9.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 10  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M10.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 11  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M11.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	/////////////////
	for (let i = 0; i < iu.length;i++){
		let ress = iu[i]
		for(k in iu[i]){
			if(new Date(iu[i][k].JourneyDate).getMonth()+ 1 == 12  && iu[i][k].JourneyId.JourneyPriority == 5 ){
				arrr5M12.push(iu[i][k].JourneyId.JourneyPriority)
			}
		}
	}
	
	
	/////////////////////Push Into Array ///////////////

// var journey101 = []
// var journey201 = []
// var journey202 = []
// var journey301 = []
// var journey401 = []
	//Pushing journey 101
	journey101.push((arrrM1.length !== 0?arrrM1.length:0))
	journey101.push((arrrM2.length !== 0?arrrM2.length:0))
	journey101.push((arrrM3.length !== 0?arrrM3.length:0))
	journey101.push((arrrM4.length !== 0?arrrM4.length:0))
	journey101.push((arrrM5.length !== 0?arrrM5.length:0))
	journey101.push((arrrM6.length !== 0?arrrM6.length:0))
	journey101.push((arrrM7.length !== 0?arrrM7.length:0))
	journey101.push((arrrM8.length !== 0?arrrM8.length:0))
	journey101.push((arrrM9.length !== 0?arrrM9.length:0))
	journey101.push((arrrM10.length !== 0?arrrM10.length:0))
	journey101.push((arrrM11.length !== 0?arrrM11.length:0))
	journey101.push((arrrM12.length !== 0?arrrM12.length:0))
	
	// console.log('month9101',arrrM9)
	//Pushing journey 201

	journey201.push((arrr2M1.length !== 0?arrr2M1.length:0))
	journey201.push((arrr2M2.length !== 0?arrr2M2.length:0))
	journey201.push((arrr2M3.length !== 0?arrr2M3.length:0))
	journey201.push((arrr2M4.length !== 0?arrr2M4.length:0))
	journey201.push((arrr2M5.length !== 0?arrr2M5.length:0))
	journey201.push((arrr2M6.length !== 0? arrr2M6.length:0))
	journey201.push((arrr2M7.length !== 0?arrr2M7.length:0))
	journey201.push((arrr2M8.length !== 0?arrr2M8.length:0))
	journey201.push((arrr2M9.length !== 0?arrr2M9.length:0))
	journey201.push((arrr2M10.length !== 0?arrr2M10.length:0))
	journey201.push((arrr2M11.length !== 0?arrr2M11.length:0))
	journey201.push((arrr2M12.length !== 0?arrr2M12.length:0))
	// console.log('month9201',arrr2M9)
	
	//Pushing journey 202
	
	journey202.push((arrr3M1.length !== 0?arrr3M1.length:0))
	journey202.push((arrr3M2.length !== 0?arrr3M2.length:0))
	journey202.push((arrr3M3.length !== 0?arrr3M3.length:0))
	journey202.push((arrr3M4.length !== 0?arrr3M4.length:0))
	journey202.push((arrr3M5.length !== 0?arrr3M5.length:0))
	journey202.push((arrr3M6.length !== 0? arrr3M6.length:0))
	journey202.push((arrr3M7.length !== 0?arrr3M7.length:0))
	journey202.push((arrr3M8.length !== 0?arrr3M8.length:0))
	journey202.push((arrr3M9.length !== 0?arrr3M9.length:0))
	journey202.push((arrr3M10.length !== 0?arrr3M10.length:0))
	journey202.push((arrr3M11.length !== 0?arrr3M11.length:0))
	journey202.push((arrr3M12.length !== 0?arrr3M12.length:0))
	// console.log('month9202',arrr3M9)
	
	//Pushing journey 301
	
	journey301.push((arrr4M1.length !== 0?arrr4M1.length:0))
	journey301.push((arrr4M2.length !== 0?arrr4M2.length:0))
	journey301.push((arrr4M3.length !== 0?arrr4M3.length:0))
	journey301.push((arrr4M4.length !== 0?arrr4M4.length:0))
	journey301.push((arrr4M5.length !== 0?arrr4M5.length:0))
	journey301.push((arrr4M6.length !== 0? arrr4M6.length:0))
	journey301.push((arrr4M7.length !== 0?arrr4M7.length:0))
	journey301.push((arrr4M8.length !== 0?arrr4M8.length:0))
	journey301.push((arrr4M9.length !== 0?arrr4M9.length:0))
	journey301.push((arrr4M10.length !== 0?arrr4M10.length:0))
	journey301.push((arrr4M11.length !== 0?arrr4M11.length:0))
	journey301.push((arrr4M12.length !== 0?arrr4M12.length:0))
	// console.log('month9301',arrr4M9)
	//Pushing journey 401

	journey401.push((arrr5M1.length !== 0?aarrr5M1.length:0))
	journey401.push((arrr5M2.length !== 0?arrr5M2.length:0))
	journey401.push((arrr5M3.length !== 0?arrr5M3.length:0))
	journey401.push((arrr5M4.length !== 0?arrr5M4.length:0))
	journey401.push((arrr5M5.length !== 0?arrr5M5.length:0))
	journey401.push((arrr5M6.length !== 0? arrr5M6.length:0))
	journey401.push((arrr5M7.length !== 0?arrr5M7.length:0))
	journey401.push((arrr5M8.length !== 0?arrr5M8.length:0))
	journey401.push((arrr5M9.length !== 0?arrr5M9.length:0))
	journey401.push((arrr5M10.length !== 0?arrr5M10.length:0))
	journey401.push((arrr5M11.length !== 0?arrr5M11.length:0))
	journey401.push((arrr5M12.length !== 0?arrr5M12.length:0))
	// console.log('month9401',arrr5M9)
	
	if(selectedYear == new Date().getFullYear()){
		let sli = new Date().getMonth()
		let finalJourney101 = journey101.slice(0,sli + 1)
		let finalJourney201 = journey201.slice(0,sli + 1)
		let finalJourney202 = journey202.slice(0,sli + 1)
		let finalJourney301 = journey301.slice(0,sli + 1)
		let finalJourney401 = journey401.slice(0,sli + 1)
	
		// console.log('slicejourneys',{levle1:finalJourney101,levle2:finalJourney201,levle3:finalJourney202,levle4:finalJourney301,levle5:finalJourney401})
		return {levle1:finalJourney101,levle2:finalJourney201,levle3:finalJourney202,levle4:finalJourney301,levle5:finalJourney401}
	}
	// console.log('full',{male:totalMalePreMonth,female:totalFemalePreMonth})
	return {levle1:journey101,levle2:journey201,levle3:journey202,levle4:journey301,levle5:journey401}

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
				if(memsData[i].Sex == 'Male' || memsData[i].Sex == 'male' || memsData[i].Sex == 'MALE'){
					male.push(memsData[i])
				//console.log(data[i])
				}
			}
			// female
			for(let i = 0; i < memsData.length; i++){
				if(memsData[i].Sex == 'Female' || memsData[i].Sex == 'female' || memsData[i].Sex == 'FEMALE'){
					female.push(memsData[i])
				//console.log(data[i])
				}
			}
			//total
			let mNum = male.length
			let fNum = female.length
			let totNum = memsData.length
			
			let dd = {male:mNum ,female:fNum,total:totNum}
			// console.log(dd)
			
			res.status(200).json({
				status:'success',
				data:dd
			})		
		}
   })	
 
})


// statisticsDashborad
exports.statisticsDashborad = (req, res, next) => {
   
	//console.log(req.body.ya)
	 Member.find({})
	.exec()
	.then((memsData)=>{
		if(memsData.length >= 1){
			//console.log(memsData)
			let maindd = dashboradFilter(memsData,req.body.ya)	
			// console.log('dsh',maindd)
			res.status(200).json({
				status:'success',
				data:maindd
			})	
		}
		
	})
	
		 
}
exports.attendanceDashborad = async(req, res, next) => {

	const allMembers = await Member.find({})
	 .populate({
			path: 'journeyAttend',
			populate: {
			path: ' JourneyId'
			}
		})
	.exec()
	// console.log(req.body.ya)
	const attResult = filterAttendance(allMembers,req.body.ya)
	// console.log(attResult)
	res.status(200).json({
	 status:'success',
	 data:attResult
	})
	

}
