const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const MemberModel = require('../models/membersModel');
const JourneyAttendanceModel = require('../models/journeyAttendanceModel');
const JourneyModel = require('../models/JourneyModel');


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

//////////////////////////////////////////////


/////////////////////////////////////////////////////////////
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
    const {MemberID,RegNumber,Surname,Firstname,Address,PhoneNo,Sex,Email,DOB,MaritalStatus,WeddingAnniversary,Occupation,Business,Expertise,MemberTypeName,Status,DateJoinedTKA} = req.body
	//console.log(req.body)

	// try{
		const memberExist = await MemberModel.findOne({RegNumber:RegNumber})
		if(memberExist){
			res.status(500).json({
				status:'fail',
				message:'RegNumber exist!!'
			})
		}else{
			if(req.file){
				let journey22 = await JourneyModel.find({JourneyPriority:1})
				console.log(journey22)
				let journey33 = await JourneyModel.find({JourneyPriority:2})
				console.log(journey33)
				const newMember = await MemberModel.create({
					RegNumber,
					Surname,
					Firstname,
					Address,
					PhoneNo,
					ImageUrl:`${req.protocol}://${req.get('host')}/publicFile/members/${req.file.filename}`,
					Sex,
					Email,
					DOB,
					MaritalStatus,
					WeddingAnniversary,
					Occupation,
					Business,
					Expertise,
					DateJoinedTKA,
					currentJourney:journey22[0]._id,
					nextJourney:journey33[0]._id
				})
				
			   if(newMember){
				   console.log(newMember)
				   res.status(200).json({
					status:'success',
					message:'Member Registration Successful'
					})
			   }
			}else{
				let journey11 = await JourneyModel.find({JourneyPriority:1})
				console.log(journey11)
				let journey44 = await JourneyModel.find({JourneyPriority:2})
				console.log(journey44)
				const newMember2 = await MemberModel.create({
		
					RegNumber,
					Surname,
					Firstname,
					Address,
					PhoneNo,
					ImageUrl:`${req.protocol}://${req.get('host')}/publicFile/members/default.jpg`,
					Sex,
					Email,
					DOB,
					MaritalStatus,
					WeddingAnniversary,
					Occupation,
					Business,
					Expertise,
					DateJoinedTKA,
					currentJourney:journey11[0]._id,
					nextJourney:journey44[0]._id
					
				})
				
			   if(newMember2){
				   console.log(newMember2)
				   res.status(200).json({
					status:'success',
					message:'Member Registration Successful'
					})
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
	console.log(req.body)
	try {
		if(req.body){
			const current = await JourneyModel.find({JourneyPriority:1})
			const nextj = await JourneyModel.find({JourneyPriority:2})
			const maindata = req.body
			maindata.forEach((e)=>{	
				e.currentJourney = current[0]._id
				e.nextJourney =nextj[0]._id
				e.role = 'member'
				e.journeyAttend = []
				e.monthCreated = new Date().getMonth()
				e.Year = new Date().getFullYear()
				e.DOB = Number.isInteger(e.DOB)?ExcelDateToJSDate(e.DOB):e.DOB
				e.WeddingAnniversary = Number.isInteger(e.WeddingAnniversary)?ExcelDateToJSDate(e.WeddingAnniversary):e.WeddingAnniversary
				e.DateJoinedTKA = Number.isInteger(e.DateJoinedTKA)?ExcelDateToJSDate(e.DateJoinedTKA):e.DateJoinedTKA,
				//let mydata = [e]
				MemberModel.insertMany(e)
				
			})
		
			 
			 res.status(200).json({
				status:'success',
				message:'Bulk upload successful'
			})
		
			 
		}
		return next(new AppError('File not found',404))
	} catch (error) {
		if(error){
			res.status(500).json({
				status:'fail',
				message:error
			})
		}
	}
	

	    
}

// getBulkFiles

// Attendace

exports.Attendace = async (req,res,next)=>{
     const {id} = req.params
	 console.log(id)
   try {
	   const journey = [1,2,3,4,5];
	   if(req.body.date){
		  
		const attainedMember = await MemberModel.findById(id);
		if(attainedMember){
			
			const currentJourney = await JourneyModel.find({_id:attainedMember.currentJourney})
			if(currentJourney.length >= 1){
				
				const newJourneyAttaindance = await JourneyAttendanceModel.create({
				   JourneyDate:req.body.date,
				   JourneyId:currentJourney[0]._id,				  
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
	console.log(word)
	let isnum = /^\d+$/.test(word);
	console.log(isnum)
	if(isnum){
		 console.log('number')
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
				console.log(result)
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
	}else{
		console.log('string')
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
				console.log(result)
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
	
	
	
     
}

exports.singleFile = (req,res,next)=>{
	console.log(req.file)
	res.status(200).json({
		status:'file uploaded'
	})
}

exports.updateUser = async (req,res,next)=>{
	try {
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
	} catch (error) {
		if(error){
			res.status(500).json({
				status:'fail',
				message:error
			})
		}
	}

}