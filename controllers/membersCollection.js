const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const Member = require('../models/membersModel');
const XLSX = require("xlsx");
const BulkModel = require('../models/bulkUploadModel');
const nextJ = require('../utils/journeyCheck');
const xlmulter = require('../utils/multer');
const JourneyModel = require('../models/journeyAttendanceModel');
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"upload");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage});

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const upload2 = multer({ storage: storage});

exports.uploadUserPhoto = upload.single('file');
exports.xlsFileUpload = upload2.single('file');

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


exports.memberRegistration = catchAsync(async (req,res,next)=>{
    const {MemberID,RegNumber,Surname,Firstname,Address,PhoneNo,Sex,Email,DOB,MaritalStatus,WeddingAnniversary,Occupation,Business,Expertise,MemberTypeName,Status,DateJoinedTKA,ALTDate,MinistryID1,MinistryID2,MinistryID3} = req.body
	console.log(req.body)
	 const newMember = await Member.create({
		MemberID,
		RegNumber,
		Surname,
		Firstname,
		Address,
		PhoneNo,
		ImageUrl:`${req.protocol}://${req.get('host')}/public/img/members/default.jpg`,
		Sex,
		Email,
		DOB,
		MaritalStatus,
		WeddingAnniversary,
		Occupation,
		Business,
		Expertise,
		MemberTypeName,
		Status,
		DateJoinedTKA,
		ALTDate,
		MinistryID1,
		MinistryID2,
		MinistryID3
	})
	
   if(newMember){
	   res.status(200).json({
        status:'success',
        message:'Member Registration Successful'
		})
   }
    
})

exports.membersBulkUpload = catchAsync(async (req,res,next)=>{
	console.log(req.body)
	if(req.body){
		const maindata = req.body
		maindata.forEach((e)=>{
			e.currentJourney = 'Journey 101'
			e.nextJourney = 'Journey 201'
			e.role = 'member'
			e.journeyAttend = []
			e.monthCreated = new Date().getMonth()
			e.Year = new Date().getFullYear()
			e.DOB = Number.isInteger(e.DOB)?ExcelDateToJSDate(e.DOB):e.DOB
			e.WeddingAnniversary = Number.isInteger(e.WeddingAnniversary)?ExcelDateToJSDate(e.WeddingAnniversary):e.WeddingAnniversary
			e.DateJoinedTKA = Number.isInteger(e.DateJoinedTKA)?ExcelDateToJSDate(e.DateJoinedTKA):e.DateJoinedTKA,
			e.ALTDate = Number.isInteger(e.ALTDate)?ExcelDateToJSDate(e.ALTDate):e.ALTDate
			let mydata = [e]
			const bulkMember = Member.insertMany(e)
			
		})
	
		 
		 res.status(200).json({
			status:'success',
			message:'Bulk upload successful'
		})
	
		 
	}
	return next(new AppError('File not found',404))

	    
})

// getBulkFiles

// Attendace

exports.Attendace = catchAsync(async (req,res,next)=>{
     const {id} = req.params
     const {date} = req.body
     const journey = ['Journey 101','Journey 201','Journey 202','Journey 301','Journey 401'];

     const attainedMember = await Member.findById(id);

     if(attainedMember){

       let nextJournySystem = nextJ(attainedMember.currentJourney)

       const newJourneyAttaindance = await JourneyModel.create({
          JourneyDate:date,
          JourneyAtten:attainedMember.currentJourney,
          MemberID:attainedMember._id
        })

       if(nextJournySystem !== 'final'){
           let indexJ = journey.indexOf(nextJournySystem)
           if(attainedMember.currentJourney !== 'Journey 301'){
               const updataMember = await Member.updateOne(
                   {_id:attainedMember._id},
                   {
                       $push:{journeyAttend:newJourneyAttaindance._id}
                   },
                   {currentJourney:nextJournySystem},
                   {nextJourney:indexJ + 1},
                   )
               }

               res.status(200).json({
                   status:'success',
                   data:updataMember
               })

           }
           const updataMember1 = await Member.updateOne(
               {_id:attainedMember._id},
                {
                   $push:{journeyAttend:newJourneyAttaindance._id}
                },
               {currentJourney:nextJournySystem},
               {nextJourney:'Journey Completed'},
               )
           }
           res.status(200).json({
            status:'success',
            data:updataMember1
          })
        
})

exports.singleMember = catchAsync(async (req,res,next)=>{
    const {id} = req.params;

    const memberProfile = await Member.findOne({_id:id})
    .populate('journeyAttend')

     if(memberProfile){
         res.status(200).json({
             status:'success',
             data:memberProfile
         })
     }
})