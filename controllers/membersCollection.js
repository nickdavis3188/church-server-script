const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const MemberModel = require('../models/membersModel');
const JourneyAttendanceModel = require('../models/journeyAttendanceModel');
const JourneyModel = require('../models/JourneyModel');
const JourneyDateModel = require('../models/journeyDateModel');
const SuspendModel = require('../models/suspendModel');
// const cloudinary = require('../utils/cloudinary')
var cloudinary = require('cloudinary').v2

//////////////////////////////////Multer config//////////

const storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./publicFile/members/');
	},
	filename:function(req,file,cb){
		cb(null,new Date().getFullYear()+file.originalname);
	}
})

const fileFilter = (req,file,cb)=>{
	if(file.mimetype.startsWith('image')){
		cb(null,true)
	}else{
		cb(new AppError('Not an image! Please upload only images', 400),false)
	}
}

exports.upload = multer({storage:storage,fileFilter:fileFilter})




//Code to resize image and store as jpg
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
/////////////////////////////////////////////////////////////


//convert excel date serial int to Date
function ExcelDateToJSDate(serial) {
   var utc_days  = Math.floor(serial - 25569);
   var utc_value = utc_days * 86400;
   var date_info = new Date(utc_value * 1000);

   var fractional_day = serial - Math.floor(serial) + 0.0000001;

   var total_seconds = Math.floor(86400 * fractional_day);

   var seconds = total_seconds % 60;

   total_seconds -= seconds;

   var hours = Math.floor(total_seconds / (60 * 60));
   var minutes = Math.floor(total_seconds / 60) % 60;

   return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


exports.memberRegistration = async (req,res,next)=>{
    const {RegNumber,Surname,Firstname,Address,PhoneNo,Sex,Email,Dob,MaritalStatus,WeddingAnniversary,Occupation,Business,Expertise,DateJoinedTKA} = req.body
	//console.log(req.body)

	// try{

		const allMembers = await MemberModel.find({})

		const primaryFilter = allMembers.filter((e)=> e.Primary)

		const finalFilter = primaryFilter.filter((e)=> e.Primary == Firstname.toUpperCase() + Surname.toUpperCase() )
		// console.log(finalFilter)
		if(finalFilter.length >= 1){
			res.status(500).json({
				status:'fail',
				message:'Member exist'
			})
		}else{
			const memberExist = await MemberModel.findOne({RegNumber:RegNumber})
		if(memberExist){
			res.status(500).json({
				status:'fail',
				message:'RegNumber exist!!'
			})
		}else{
			if(req.file){
				// console.log(Dob)
				let journey22 = await JourneyModel.find({JourneyPriority:1})
				// console.log(journey22)
				let journey33 = await JourneyModel.find({JourneyPriority:2})
				// console.log(journey33)
				if(WeddingAnniversary !== "null"){
					const newMember2 = await MemberModel.create({
						RegNumber,
						Surname,
						Firstname,
						Address,
						PhoneNo,
						ImageUrl:`${req.protocol}://${req.get('host')}/publicFile/members/${req.file.filename}`,
						Sex,
						Email,
						Dob,
						MaritalStatus,
						WeddingAnniversary,
						Occupation,
						Business,
						Expertise,
						DateJoinedTKA,
						Primary:Firstname.toUpperCase() + Surname.toUpperCase(),
						currentJourney:journey22[0]._id,
						nextJourney:journey33[0]._id
					})

				   if(newMember2){
					   // console.log(newMember2)
					   res.status(200).json({
						status:'success',
						message:'Member Registration Successful'
						})
					}
				}else{
					const newMember3 = await MemberModel.create({
						RegNumber,
						Surname,
						Firstname,
						Address,
						PhoneNo,
						ImageUrl:`${req.protocol}://${req.get('host')}/publicFile/members/${req.file.filename}`,
						Sex,
						Email,
						Dob,
						MaritalStatus,
						Occupation,
						Business,
						Expertise,
						DateJoinedTKA,
						Primary:Firstname.toUpperCase() + Surname.toUpperCase(),
						currentJourney:journey22[0]._id,
						nextJourney:journey33[0]._id
					})

				   if(newMember3){
					   // console.log(newMember3)
					   res.status(200).json({
						status:'success',
						message:'Member Registration Successful'
						})
					}

				}

			}else{
				let journey11 = await JourneyModel.find({JourneyPriority:1})
				// console.log(journey11)
				let journey44 = await JourneyModel.find({JourneyPriority:2})
				// console.log(journey44)
				if(WeddingAnniversary !== "null"){
					const newMember4 = await MemberModel.create({
						RegNumber,
						Surname,
						Firstname,
						Address,
						PhoneNo,
						ImageUrl:`${req.protocol}://${req.get('host')}/publicFile/members/default.jpg`,
						Sex,
						Email,
						Dob,
						MaritalStatus,
						WeddingAnniversary,
						Occupation,
						Business,
						Expertise,
						DateJoinedTKA,
						Primary:Firstname.toUpperCase() + Surname.toUpperCase(),
						currentJourney:journey11[0]._id,
						nextJourney:journey44[0]._id

					})

				   if(newMember4){
					  // console.log(newMember4)
					   res.status(200).json({
						status:'success',
						message:'Member Registration Successful'
						})
				   }
				}else{
					const newMember5 = await MemberModel.create({
						RegNumber,
						Surname,
						Firstname,
						Address,
						PhoneNo,
						ImageUrl:`${req.protocol}://${req.get('host')}/publicFile/members/default.jpg`,
						Sex,
						Email,
						Dob,
						MaritalStatus,
						Occupation,
						Business,
						Expertise,
						DateJoinedTKA,
						Primary:Firstname.toUpperCase() + Surname.toUpperCase(),
						currentJourney:journey11[0]._id,
						nextJourney:journey44[0]._id

					})

				   if(newMember5){
					   // console.log(newMember5)
					   res.status(200).json({
						status:'success',
						message:'Member Registration Successful'
						})
				   }
				}

			}

		}

		}


	// }catch(err){
	// 	res.status(500).json({
	// 		status:'fail',
	// 		message:err
	// 	})

	// }


}

exports.membersBulkUpload = async (req,res,next)=>{
	// console.log(req.body)
	try {
		if(req.body){
			const current = await JourneyModel.find({JourneyPriority:1})
			const nextj = await JourneyModel.find({JourneyPriority:2})
			const maindata = req.body
			maindata.forEach((e)=>{
				e.currentJourney = current[0]._id;
				e.nextJourney =nextj[0]._id;
				e.ImageUrl = `${req.protocol}://${req.get('host')}/publicFile/members/default.jpg`,
				e.role = 'member';
				e.journeyAttend = [];
				e.monthCreated = new Date().getMonth() + 1;
				e.Year = new Date().getFullYear();
				e.DOB = Number.isInteger(e.DOB)?ExcelDateToJSDate(e.DOB):e.DOB;
				e.WeddingAnniversary = Number.isInteger(e.WeddingAnniversary)?ExcelDateToJSDate(e.WeddingAnniversary):e.WeddingAnniversary;
				e.DateJoinedTKA = Number.isInteger(e.DateJoinedTKA)?ExcelDateToJSDate(e.DateJoinedTKA):e.DateJoinedTKA;
				e.Primary = e.Firstname + e.Surname
			
				MemberModel.insertMany(e);

			})


			res.status(200).json({
				status:'success',
				message:'Bulk upload successful'
			})
			
		}else{
			res.status(404).json({
				status:'NOTFOUND',
				message:'File not send to the server.'
			})
		}
		
	} catch (error) {
		if(error){
			console.log(error)
			res.status(500).json({
				status:'fail',
				message:'XLSX validation faild'
			})
		}
	}
}

exports.attendanceBulkUpload = async (req,res,next)=>{
	// console.log(req.body)
	try {
		if(req.body){
			
			const maindata = req.body
			
			for(let e = 0; e < maindata.length; e++){
				
				if(maindata[e].MemberId){
					// console.log(req.dateAttain)
					const journey = [1,2,3,4,5];
					const attainedMember = await MemberModel.findById(maindata[e].MemberId);
					// console.log(attainedMember)
					if(attainedMember){

						const currentJourney = await JourneyModel.find({_id:attainedMember.currentJourney})
						if(currentJourney.length >= 1){

							const newJourneyAttaindance = await JourneyAttendanceModel.create({
								MemberId:maindata[e].MemberId,
							   JourneyDate:maindata[e].JourneyDate,
							   JourneyId:maindata[e].JourneyId,
							   AdminId:maindata[e].AdminId
							})

							if(newJourneyAttaindance){


								const currentNextJourney = await JourneyModel.find({_id:attainedMember.nextJourney})

								const currentJourney = await JourneyModel.find({_id:attainedMember.currentJourney})

								let currentNextJourneyIndex = journey.indexOf(currentNextJourney[0].JourneyPriority);

								let currentCurrentJourneyIndex = journey.indexOf(currentJourney[0].JourneyPriority);



								if(currentNextJourneyIndex === 4){
									const allJourney = await JourneyModel.find({JourneyPriority:6})
									const updataMember = await MemberModel.updateOne(
										{_id:attainedMember._id},
										{
											$push:{journeyAttend:newJourneyAttaindance._id},
											$set:{currentJourney:attainedMember.nextJourney, nextJourney:allJourney[0]._id}
										}
									)
									
								}else if(currentCurrentJourneyIndex === 4 ){
									const allJourney2 = await JourneyModel.find({JourneyPriority:6})
									const updataMember2 = await MemberModel.updateOne(
										{_id:attainedMember._id},
										{
											$push:{journeyAttend:newJourneyAttaindance._id},
											$set:{currentJourney:allJourney2[0]._id}
										}
									)
									
								}
								else{
									const allJourney3 = await JourneyModel.find({})
									const updataMember3 = await MemberModel.updateOne(
										{_id:attainedMember._id},
										{
											$push:{journeyAttend:newJourneyAttaindance._id},
											$set:{currentJourney:attainedMember.nextJourney,nextJourney:allJourney3[currentNextJourneyIndex + 1]}
										}
									)
									
								}

							}
						}
					}
				}
			}
			
			res.status(200).json({
				status:'success',
				message:'Bulk upload successful'
			})
			
			
		}else{
			res.status(404).json({
				status:'NOTFOUND',
				message:'File not send to the server.'
			})
		}
		
	} catch (error) {
		if(error){
			console.log(error)
			res.status(500).json({
				status:'fail',
				message:'XLSX validation faild'
			})
		}
	}
}

// gchek Journey Date
exports.journeyDateCheck = async (req,res,next)=>{
	// try {
		const journeyDate = await JourneyDateModel.find({})

		if(journeyDate.length >= 1){
			// console.log('dateJ',journeyDate)
			const currentOrLastDate = journeyDate[ journeyDate.length -1 ]

			const journeyD = new Date(currentOrLastDate.createdAt).toLocaleDateString()
			const currentD = new Date().toLocaleDateString()

			if(currentD !== journeyD){
				res.status(404).json({
					status:'not found',
					message:'Journey Date Not Set'
				})
			}

			// console.log('singlrDate',currentOrLastDate.journeyDate)
			req.dateAttain = journeyDate[0].journeyDate
			
			// GRANT ACCESS TO ROUTE
			next()

		}
	// } catch (error) {
	// 	res.status(500).json({
	// 		status:'fail',
	// 		message:console.error()
	// 	})
	// }

}


// Attendace

exports.Attendace = async (req,res,next)=>{
    const {id} = req.body

    try {
	
		if(req.dateAttain){
			// console.log(req.dateAttain)
			const journey = [1,2,3,4,5];
			const attainedMember = await MemberModel.findById(id);
			if(attainedMember){

				const currentJourney = await JourneyModel.find({_id:attainedMember.currentJourney})
				if(currentJourney.length >= 1){

					const newJourneyAttaindance = await JourneyAttendanceModel.create({
						MemberId:attainedMember._id,
					   JourneyDate:req.dateAttain,
					   JourneyId:currentJourney[0]._id,
					   AdminId:req.body.addId
					})

					if(newJourneyAttaindance){


						const currentNextJourney = await JourneyModel.find({_id:attainedMember.nextJourney})

						const currentJourney = await JourneyModel.find({_id:attainedMember.currentJourney})

						let currentNextJourneyIndex = journey.indexOf(currentNextJourney[0].JourneyPriority);

						let currentCurrentJourneyIndex = journey.indexOf(currentJourney[0].JourneyPriority);



						if(currentNextJourneyIndex === 4){
							const allJourney = await JourneyModel.find({JourneyPriority:6})
							const updataMember = await MemberModel.updateOne(
								{_id:attainedMember._id},
								{
									$push:{journeyAttend:newJourneyAttaindance._id},
									$set:{currentJourney:attainedMember.nextJourney, nextJourney:allJourney[0]._id}
								}
							)
							if(updataMember){

								res.status(200).json({
									status:'success',
									message:'successful'
								})
							}
						}else if(currentCurrentJourneyIndex === 4 ){
							const allJourney2 = await JourneyModel.find({JourneyPriority:6})
							const updataMember2 = await MemberModel.updateOne(
								{_id:attainedMember._id},
								{
									$push:{journeyAttend:newJourneyAttaindance._id},
									$set:{currentJourney:allJourney2[0]._id}
								}
							)
							if(updataMember2){

								res.status(200).json({
									status:'success',
									message:'successful'
								})
							}
						}
						else{
							const allJourney3 = await JourneyModel.find({})
							const updataMember3 = await MemberModel.updateOne(
								{_id:attainedMember._id},
								{
									$push:{journeyAttend:newJourneyAttaindance._id},
									$set:{currentJourney:attainedMember.nextJourney,nextJourney:allJourney3[currentNextJourneyIndex + 1]}
								}
							)
							if(updataMember3){

								res.status(200).json({
									status:'success',
									message:'successful'
								})
							}
						}

					}
				}
			}
		}
	} catch (error) {
			if(error){
				res.status(500).json({
					status:'fail',
					message:error
				})
			}
	}
}



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
exports.singleMember = (req,res,next)=>{
    const {word} = req.body;
	// console.log(word)
	let isnum = /^\d+$/.test(word);
	// console.log(isnum)
	if(isnum){
		
		 // console.log('number')
		MemberModel.find({PhoneNo:parseInt(word)})
		.populate('currentJourney')
		.populate('nextJourney')
		. populate({
			path: 'journeyAttend',
			populate: {
			path: ' JourneyId'
			}
		})
		.exec()
		.then((result)=>{
			if(result.length >= 1){
				
				res.status(200).json({
				 status:'success',
				 data:result
				})
				
				// console.log(result)
				
			}else{
				res.status(404).json({
				 status:'fail',
				 message:'Member not found'
			 })
			}
		})
		.catch((err)=>{
			if(err){
				res.status(500).json({
					status:'fail',
					message:err
				})
			}

		})
	}else{
		// console.log('string')
		const regex = new RegExp(!isnum?escapeRegex(word):'', 'gi')
		MemberModel.find({$or:[{Surname:regex},{RegNumber:regex},{Email:regex}]})
		.populate('currentJourney')
		.populate('nextJourney')
		. populate({
			path: 'journeyAttend',
			populate: {
			path: ' JourneyId'
			}
		})
		.exec()
		.then((result)=>{
			if(result.length >= 1){
			
				res.status(200).json({
				 status:'success',
				 data:result
				})
				
			}else{
				res.status(404).json({
				 status:'fail',
				 message:'Member not found'
			 })
			}
		})
		.catch((err)=>{
			if(err){
				console.log(err)
				res.status(500).json({
					status:'fail',
					message:err
				})
			}

		})
	}




}

exports.singleFile = async (req,res,next)=>{
	try{
		cloudinary.config({
			cloud_name: 'drnmgqzz1',
			api_key: '341368962355296',
			api_secret: 'fgZj7bcrS8bnCoNh1wQk7FihnyQ'
		  })
		// console.log(req.body.file)
		const uploader = await cloudinary.uploader.upload(req.body.file,{
		upload_preset:'DTMDMS'
	})
	// console.log(uploader)
	// console.log(req.file)
	res.status(200).json({
		status:'file uploaded',
		data:uploader
	})
	} catch (error) {
			if(error){
				console.log(error)
			}
	}

}
// asset_id: "0d406fadfdf8a475a30f564486d50458"
// secure_url: "https://res.cloudinary.com/drnmgqzz1/image/upload/v1632626421/DTMDMS/mwvi9a5ownjki7zwl6p6.jpg"
// signature: "5ff809f31f357e149c161f688a14c2dcc89de99e"
exports.updateUser = async (req,res,next)=>{
	const {RegNumber,Surname,Firstname,Address,PhoneNo,Sex,Email,Dob,MaritalStatus,WeddingAnniversary,Occupation,Business,Expertise,DateJoinedTKA} = req.body

		const memberUpdate = await MemberModel.updateOne(
			{_id:req.params.id},
			{$set:req.body}
		)
		if(memberUpdate.nModified !== 0){
			res.status(200).json({
				status:'success',
				message:'Update successful'
			})
		}else{
			res.status(500).json({
				status:'fail',
				message:'Update fail'
			})
		}


}

exports.deleteMember = async (req, res, next) => {
	const {id} = req.body

	const delAdmin = await MemberModel.deleteOne({_id:id})

	if(delAdmin.deletedCount >= 1){
		res.status(200).json({
			status:'success',
		})
	}else{
		res.status(500).json({
			status:'fail',
			message:'Fail to delete'
		})
	}

}

exports.idSearch = (req, res, next) => {
	const {id} = req.body
	// console.log(id)
	// const resSearch = await MemberModel.findById({_id:id})
	MemberModel.find({_id:id})
		.populate('currentJourney')
		.populate('nextJourney')
		.populate('SincurrentJourney')
		.populate('SinnextJourney')
		. populate({
			path: 'journeyAttend',
			populate: {
			path: ' JourneyId'
			}
		})
		.exec()
		.then((result)=>{
			if(result.length >= 1){
				// console.log(result)
				res.status(200).json({
				 status:'success',
				 data:result
				})
			}else{
				res.status(404).json({
				 status:'fail',
				 message:'Member not found'
			 })
			}
		})
		.catch((err)=>{
			if(err){
				res.status(500).json({
					status:'fail',
					message:err
				})
			}

		})
}



exports.bulkUpdateSearchData = async (req, res, next) => {
	let searchDate = new Date(req.body.date).toISOString();
	
	const mem1 = await JourneyAttendanceModel.find({})
	.populate('MemberId')

	const memIdFilter = mem1.filter((e)=> e.MemberId )
	const yearFilter = memIdFilter.filter((e)=> new Date(e.JourneyDate).getFullYear()== new Date(req.body.date).getFullYear()) 
	const MonthFilter = yearFilter.filter((e)=> new Date(e.JourneyDate).getMonth()+1 == new Date(req.body.date).getMonth()+1) 
	const DayFilter = MonthFilter.filter((e)=> new Date(e.JourneyDate).getDate() == new Date(req.body.date).getDate()) 

	if(DayFilter.length >= 1){
		res.status(200).json({
			status:'success',
			data:DayFilter
		})
	}else{
		res.status(404).json({
			status:'not found'
		})
	}
}

exports.bulkUpdate = async (req, res, next) => {
	let myModifiedData = req.body.data
	// console.log('body',req.body.data)
	let numberOfSuccessfulUpdate = []
	
	for(let i = 0; i < myModifiedData.length;i++){
		
		const updataMember222 = await MemberModel.updateOne(
			{_id:myModifiedData[i]._id},
			{
				$set:myModifiedData[i]
			}		
		)
		if(updataMember222.nModified == 1){
			numberOfSuccessfulUpdate.push(updataMember222.nModified)
		}
		
	}
	
	// console.log('number',numberOfSuccessfulUpdate)
	
	if(numberOfSuccessfulUpdate.length >= 1){
		res.status(200).json({
			status:'success',
			message:`${numberOfSuccessfulUpdate.length} Update Successful`
		})
	}else{
		res.status(500).json({
			status:'fail',
			message:'Update Fail'
		})
	}
}
exports.cheackSinJourney = async (req, res, next) => {
	const sin = await MemberModel.find({_id:req.body.id})
		.populate('currentJourney')
		.populate('nextJourney')
		.populate('SincurrentJourney')
		.populate({
			path: 'journeyAttend',
			populate: {
			path: ' JourneyId'
			}
		})
	if(sin.length >= 1){
		if(sin[0].journeyAttend.length >= 1){
			// console.log(sin)
			const journey = [1,2,3,4,5];
			const journeyWithNewStatus =  sin[0].journeyAttend.filter((e)=>e.Status == 'New')
			let lastNew = journeyWithNewStatus[journeyWithNewStatus.length -1]
			// console.log(lastNew)
			if(lastNew.JourneyId.JourneyPriority < 5){
				let confirmYear = new Date().getFullYear() - new Date(lastNew.JourneyDate).getFullYear() != 0? new Date().getFullYear()- new Date(lastNew.JourneyDate).getFullYear():0
				let confirmMonth = new Date(lastNew.JourneyDate).getMonth() + 1 - new Date().getMonth() + 1 != 0 ? new Date(lastNew.JourneyDate).getMonth() + 1 - new Date().getMonth() + 1:0
				
				const curJourney = await JourneyModel.find({_id:lastNew.JourneyId._id})
				// let JourneyIndex = journey.indexOf(curJourney[0].JourneyPriority);
				// let jIndex = JourneyIndex + 2
				// console.log('JourneyIndex',JourneyIndex)
				const JourneyNe = await JourneyModel.findOne({JourneyPriority:journey.indexOf(curJourney[0].JourneyPriority)+2})
				
				if(sin[0].SincurrentJourney){
					
					if(sin[0].SincurrentJourney.JourneyPriority !== JourneyNe.JourneyPriority){
					// console.log('JourneyNe',JourneyNe)
						if(confirmYear >= 1){
							
							const updataMember362 = await MemberModel.updateOne(
								{_id:req.body.id},
								{
									$set:{memberStatus:'Repeated'}		
								}
							)
							if(updataMember362.nModified ==1){
								res.status(200).json({
									status:'success',
									code:6
								})
							}
										
							
						}
					}else{
						const updataMember365 = await MemberModel.updateOne(
							{_id:req.body.id},
							{
								$set:{memberStatus:'new'}		
							}
						)
						if(updataMember365.nModified ==1){
							res.status(200).json({
								status:'success',
								code:0
							})
						}
					}
				}else{
					next()
				}
			}
		}
	}
}



let currentMonthtPass = ()=>{
	let mth = [1,2,3,4,5,6,7,8,9,10,11,12];
	let currentMonth = new Date().getMonth() + 1;	
	let sliceMonth = mth.slice(0,currentMonth - 1);	
	return sliceMonth.length
}

exports.cheackJourney = async (req, res, next) => {
	// console.log(req.body.id)
	const sin = await MemberModel.find({_id:req.body.id})
		.populate('currentJourney')
		.populate('nextJourney')
		.populate('SincurrentJourney')
		.populate({
			path: 'journeyAttend',
			populate: {
			path: ' JourneyId'
			}
		})
	if(sin.length >= 1){
		if(sin[0].journeyAttend.length >= 1){
			// console.log(sin)
			const journey = [1,2,3,4,5];
			const journeyWithNewStatus =  sin[0].journeyAttend.filter((e)=>e.Status == 'New')
			let lastNew = journeyWithNewStatus[journeyWithNewStatus.length -1]
			console.log('lastNew',lastNew)
			if(lastNew.JourneyId.JourneyPriority < 5){
				let confirmYear = new Date().getFullYear() - new Date(lastNew.JourneyDate).getFullYear() != 0? new Date().getFullYear()- new Date(lastNew.JourneyDate).getFullYear():0
				console.log('confirmYear',confirmYear)
				let currentMonth = new Date().getMonth() + 1;
				let journeyMonth = new Date(lastNew.JourneyDate).getMonth() + 1;
				
				let confirmMonth = currentMonth - journeyMonth != 0 ? currentMonth - journeyMonth:0
				
				
				if(confirmYear == 1 ){
					let currentMonthPassed = currentMonthtPass();
					let journyMonthLeft = 12 - journeyMonth;
					let totalMonth = journyMonthLeft + currentMonthPassed;
					if(totalMonth >= 6){
					// console.log('6 month and above')
					const updataMember3633 = await MemberModel.updateOne(
						{_id:req.body.id},
						{
							$set:{memberStatus:'Repeated'}		
						}
					)
					if(updataMember3633.nModified ==1){
						res.status(200).json({
							status:'success',
							code:6
						})
					}
					}else if(totalMonth >= 3){
						
						// console.log('3 month and above')
						const updataMember3644 = await MemberModel.updateOne(
							{_id:req.body.id},
							{
								$set:{memberStatus:'Repeated'}	
							}
						)
						if(updataMember3644.nModified ==1){
							 res.status(200).json({
								status:'success',
								code:3
							})
						}
					}else{
						// console.log('no month and above')
						res.status(200).json({
							status:'success',
							code:0
						})
					}
					
				}
				else if(confirmYear > 1){
					const updataMember3632 = await MemberModel.updateOne(
						{_id:req.body.id},
						{
							$set:{memberStatus:'Repeated'}		
						}
					)
					if(updataMember3632.nModified ==1){
						res.status(200).json({
							status:'success',
							code:6
						})
					}
				}else{
					if(confirmMonth >= 6){
					// console.log('6 month and above')
					const updataMember363 = await MemberModel.updateOne(
						{_id:req.body.id},
						{
							$set:{memberStatus:'Repeated'}		
						}
					)
					if(updataMember363.nModified ==1){
						res.status(200).json({
							status:'success',
							code:6
						})
					}
					}else if(confirmMonth >= 3){
						
						// console.log('3 month and above')
						const updataMember364 = await MemberModel.updateOne(
							{_id:req.body.id},
							{
								$set:{memberStatus:'Repeated'}	
							}
						)
						if(updataMember364.nModified ==1){
							 res.status(200).json({
								status:'success',
								code:3
							})
						}
					}else{
						// console.log('no month and above')
						res.status(200).json({
							status:'success',
							code:0
						})
					}
				}
								
			}else{
				res.status(200).json({
					status:'success',
					code:0
				})
			}									
		}
	}else{
		res.status(404).json({
			status:'fail',
			message:'Member Not Found'
		})
	}
}




exports.setNJourney = async (req, res, next) => {
	let levles = [1,2,3,4,5]
	let getCurrentLevle8 = levles.splice(levles.indexOf(req.body.code))
	
	const currentJourney8 = await JourneyModel.find({JourneyPriority:getCurrentLevle8[0]})
	const currentJourney9 = await JourneyModel.find({JourneyPriority:getCurrentLevle8[1]})
	
	const updataMember22 = await MemberModel.updateOne(
		{_id:req.body.id},
		{
			$set:{SincurrentJourney:currentJourney8[0]._id,SinnextJourney:currentJourney9[0]._id,memberStatus:'Repeated'},			
		}
	)
	if(updataMember22.nModified ==1){
		console.log('journey set')
		res.status(200).json({
			status:'success',
			message:'Journey Set'
		})
	}else{
			console.log('journey could not be set')
		res.status(404).json({
			status:' could not set journey'
		})
	}
}

exports.journeyAttendSecond = async (req, res, next) => {
	
	const sinMem2 = await MemberModel.find({_id:req.body.id})
		.populate('currentJourney')
		.populate('nextJourney')
		.populate({
			path: 'journeyAttend',
			populate: {
			path: ' JourneyId'
			}
	})
	if(sinMem.length >= 1){
		if(req.dateAttain){
			// console.log(req.dateAttain
			const journey = [1,2,3,4,5];
			const attainedMember = await MemberModel.findById(sinMem2[0]._id);
			if(attainedMember){

				const currentJourney = await JourneyModel.find({_id:attainedMember.SincurrentJourney})
				if(currentJourney.length >= 1){

					const newJourneyAttaindance = await JourneyAttendanceModel.create({
						MemberId:attainedMember._id,
					   JourneyDate:new Date(req.dateAttain).toLocaleDateString(),
					   JourneyId:currentJourney[0]._id,
					   Status:'Repeated',
					   AdminId:req.body.addId
					})

					if(newJourneyAttaindance){


						const currentNextJourney = await JourneyModel.find({_id:attainedMember.SinnextJourney})

						const currentJourney = await JourneyModel.find({_id:attainedMember.SincurrentJourney})

						let currentNextJourneyIndex = journey.indexOf(currentNextJourney[0].JourneyPriority);

						let currentCurrentJourneyIndex = journey.indexOf(currentJourney[0].JourneyPriority);



						if(currentNextJourneyIndex === 4){
							const allJourney = await JourneyModel.find({JourneyPriority:6})
							const updataMember = await MemberModel.updateOne(
								{_id:attainedMember._id},
								{
									$push:{journeyAttend:newJourneyAttaindance._id},
									$set:{SincurrentJourney:attainedMember.SinnextJourney, SinnextJourney:allJourney[0]._id}
								}
							)
							if(updataMember){

								res.status(200).json({
									status:'success',
									message:'successful'
								})
							}
						}else if(currentCurrentJourneyIndex === 4 ){
							const allJourney2 = await JourneyModel.find({JourneyPriority:6})
							const updataMember2 = await MemberModel.updateOne(
								{_id:attainedMember._id},
								{
									$push:{journeyAttend:newJourneyAttaindance._id},
									$set:{SincurrentJourney:allJourney2[0]._id}
								}
							)
							if(updataMember2){

								res.status(200).json({
									status:'success',
									message:'successful'
								})
							}
						}
						else{
							const allJourney3 = await JourneyModel.find({})
							const updataMember3 = await MemberModel.updateOne(
								{_id:attainedMember._id},
								{
									$push:{journeyAttend:newJourneyAttaindance._id},
									$set:{SincurrentJourney:attainedMember.SinnextJourney,SinnextJourney:allJourney3[currentNextJourneyIndex + 1]}
								}
							)
							if(updataMember3){

								res.status(200).json({
									status:'success',
									message:'successful'
								})
							}
						}

					}
				}
			}
		}
			
	}	
}

exports.confirmJourney = async (req, res, next) => {
	let updMem = await MemberModel.find({_id:req.body.id});
	if(updMem.length >= 1){
		if(updMem[0].SincurrentJourney == updMem[0].currentJourney){
			
			const updataMember36 = await MemberModel.updateOne(
				{_id:req.body.id},
				{
					$set:{memberStatus:'new'}		
				}
			)
			if(updataMember36.nModified ==1){
				res.status(200).json({
					status:'success'				
				})
			}else{
				res.status(500).json({
					status:'fil'
				})
			}
			
		}else{
			res.status(200).json({
				status:'success'				
			})
		}
	}
}