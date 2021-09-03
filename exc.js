const mongoose = require('mongoose')
 //const shortid = require('shortid');
//const { create } = require('./models/membersModel');

//const da = [
//	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:male,monthCreated:1,Year:2020}
//]


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

console.log( ExcelDateToJSDate(44441))

const hh = [
			{name:'joe',date:44440},
			{name:'sam',date:44441},
			{name:'Nick',date:44442},
]
var uu = []
let nn = hh.map((d)=>{
	return(
		uu.push(
		{name:d.name,data:d.date?ExcelDateToJSDate(d.date):''}
		)
	)
})
console.log(uu)
//////////////////////////////////////////////////////////////////////////////////////
const datass = [
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:2,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:2,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:2,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:2,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:2,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:2,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:2,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:3,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:3,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:3,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:3,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:3,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:3,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:4,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:4,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:4,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:4,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:4,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:4,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2021},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2020},
	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2020}
]


mongoose.connect('mongodb://localhost:27017/DTMDMS', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((e) =>{
  return console.log('DB Connection Successful')
})
.catch((err) => console.log(err));

const memberSchema = new mongoose.Schema(
  {
    Surname:String,
	Firstname:String,
	PhoneNo:Number,
	Sex:String,
	monthCreated:Number,
	Year:Number
},
  { timestamps: true }
)

const memberSchem = mongoose.model('Members', memberSchema);




//const bulkMember = memberSchem.insertMany(datass)

memberSchem.find({Year:'2021'},(err,data)=>{
	if(err){
		console.log(err)
	}else{
		const dashboradFilter = (yearFilterdData,selectedYear)=>{
			// let membersTotal = 0;
			// membersTotal += data.length;
			var totalMalePreMonth = []
			var totalFemalePreMonth = []
			
			// const male = yearFilterdData.filter((e)=> e.sex =='male')
			const femaleJan = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==1)
			const femaleFeb = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==2)
			const femaleMac = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==3)
			const femaleApl = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==4)
			const femaleMy = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==5)
			const femaleJn = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==6)
			const femaleJl = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==7)
			const femaleAug = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==8)
			const femaleSep = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==9)
			const femaleOct = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==10)
			const femaleNov = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==11)
			const femaleDec = yearFilterdData.filter((e)=> e.Sex =='female').filter((e)=> e.monthCreated ==12)
			
			//male
			const maleJan = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==1)
			const maleFeb = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==2)
			const maleMac = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==3)
			const maleApl = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==4)
			const maleMy = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==5)
			const maleJn = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==6)
			const maleJl = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==7)
			const maleAug = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==8)
			const maleSep = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==9)
			const maleOct = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==10)
			const maleNov = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==11)
			const maleDec = yearFilterdData.filter((e)=> e.Sex =='male').filter((e)=> e.monthCreated ==12)
			// const femaleMonth = female.filter((e)=> e.monthCreated == 1)
			
			// const totalfeb = femaleFeb.reduce(function(x,y){return x+y},0)
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
				return {male:finalMale,female:finalFemale}
			}
			return {male:totalMalePreMonth,female:totalFemalePreMonth}
		}
		console.log(dashboradFilter(data,'2021'))
	}
})
		//total
		
	//	console.log({Male:male.length,Female:female.length,Total:data.length})
		
	
	

//console.log(bulkMember)

///////////////////////////////////////////////////////////////////////////////
/**
//  * @description setup database connection
 */
// Connecting to the database
//const {DATABASE_LOCAL,DB_URL} = process.env;
//let DB= (process.env.NODE_ENV !== "production")?DB_URL:DATABASE_LOCAL
// let DB = 'mongodb://localhost:27017/DTMDMS';
//let DB = process.env.DB_URL;
//if (process.env.NODE_ENV === 'production') {
 //  DB = process.env.DB_URL;
//}

//mongoose.connect('mongodb://localhost:27017/Testing', {
//  useCreateIndex: true,
//  useFindAndModify: false,
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//
//.then((e) =>{
//  return console.log('DB Connection Successful')
//})
//.catch((err) => console.log(err));




//const storySchema = new mongoose.Schema(
 // {
 //   title:String,
//    body:String
 // },
 // { timestamps: true }
////)




//const UserSchema = new mongoose.Schema(
 //   {
 //     Name: {
 //     type: String,
 //       trim: true,
 //       required: true
 //   },
//    stories:[{ type: mongoose.Types.ObjectId, ref:'Story' }]
//    },
//    { timestamps: true }
//)

    

//const story = mongoose.model('Story', storySchema,'Story')
//const User = mongoose.model('User', UserSchema, 'User')


// const createS = async ()=>{
 //  const newStory = await story.insertMany([
//	   {
//		 title:'Davis book 3',
///		 body:'this is my third book, thanks for reading'
//	   },
//	   {
//		 title:'Davis book 3',
//		 body:'this is my third book, thanks for reading'
//	   },
//	   {
//		 title:'Davis book 3',	 
//	   },
////
 //    ])
 //   console.log(newStory)
 //}
// createS()

// storySchema.post('save', async function (doc, next) {
//     if (doc) {
//         const upU = await User.updateOne(
//            {Name:'Davis'},
//            {
//                $push:{stories:doc._id}
//             }
//        )
//        console.log(updateUser)
//        console.log(doc)
//         next()
//     }
// })

//const findU = async ()=>{
//  const myUser = await User.findOne({Name:'Davis'})
 // .populate('stories')
 // console.log(myUser)
//}
//findU()
// const createN = async ()=>{
//   const newUser = await User.create({
//         Name:'Davis'
//     })
//   console.log(newUser)
// }
// createN()

// const createS = async ()=>{
//   const newStory = await story.create({
//         title:'Davis book 3',
//         body:'this is my third book, thanks for reading'
//     })
//     const upU = await User.updateOne(
//         {Name:'Davis'},
//        {
//         $push:{stories:newStory._id}
//        }
//     )
//     console.log(upU)
// }
// createS()


// async function registerAccount() {
//   const userData = new User({ fullName: 'john doe' })
//   await userData.save()

//   console.log('register successfuly')
//   process.exit(0)
// }
// registerAccount()

// /**
//  * @description buy video course
//  */

// async function buyCourse() {
//   const user = await User.findOne({ fullName: 'john doe' })

//   const course = await Course.updateOne(
//     { userId: user._id },
//     {
//       $push: {
//         course: {
//           $each: [
//             { name: 'react for beginner', price: 95000 },
//             { name: 'vue for beginner', price: 85000 },
//             { name: 'angular for beginner', price: 75000 }
//           ]
//         }
//       }
//     }
//   )

//   console.log('sucessfuly to buy course')
//   process.exit(0)


//  const nextJourney =  (currentJourney)=>{
//     let journey = ['Journey 101','Journey 201','Journey 202','Journey 301','Journey 401'];
//    let response;
    
//     if(journey.indexOf(currentJourney) == journey.length - 1){
//         response = "final"
//        return console.log( response)
//         // return  response 
//     }
//    return console.log(journey[journey.indexOf(currentJourney)+1])
//     // return journey[journey.indexOf(currentJourney)+1]
// }

// nextJourney('Journey 201')
// console.log(new Date().to)
// const XLSX = require("xlsx");
// const wb = XLSX.readFile("./public/file/members.xlsx");

// let ws = wb.Sheets[wb.SheetNames[0]];
// let data = XLSX.utils.sheet_to_json(ws)
// console.log(data)

// for(let i = 2; i < 5; i++){
//     const  MemberId
//     const  FirstName
//    const Surname
//   const  Address
//    const PhoneNo
//    const Email
//    const RegNumber
//   const  Sex
//   const  DOB
//  const   MaritalStatus
//   const  WeddingAnniversary
//  const   Ocupation
//  const   Business
//  const   Expertise
//   const  MemberTypeName
//  const  DateJoinedTKA
//  const   ALTDate
//   const  MinistryID1
//   const  MinistryID2
//   const  MinistryID3
// }

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     port: 465,               // true for 465, false for other ports
//     host: "smtp.gmail.com",
//        auth: {
//             user: 'nickdavis3188@gmail.com',
//             pass: 'nickdavis123456',
//          },
//     secure: true,
//     });
//    var mailOptions = {
//     from: 'nickdavis3188@gmail.com',
//     to:'nyaknodavis318@gmail.com',
// subject:"Reset password",
// text:`you are receiving this because you (or someone else) have requested the reset of password \n,
//     please click the on the following link paste it into your browser to complete the process \n
//     https://braveblog2.herokuapp.com/resetPWD# \n\n
//     if you did not request this, please ignore this email and your password will remaind unchange.
//     `
// }
// transporter.sendMail(mailOptions,function(err,info){
//     if(err){
//      console.log(err)
//     }else{
//       console.log(info.id)
//     }
// })
// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port:25,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user:'nickdavis3188@gmail.com', // generated ethereal user
//       pass:'davis3188', // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "nyaknodavis318@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
// const data = [
//     {id:11,name:'davis',monthCreated:1,sex:'male'},
//     {id:22,name:'mary',monthCreated:2,sex:'female'},
//     {id:23,name:'sam',monthCreated:1,sex:'male'},
//     {id:24,name:'benita',monthCreated:2,sex:'female'},
//     {id:25,name:'tom',monthCreated:2,sex:'male'},
//     {id:26,name:'glory',monthCreated:2,sex:'female'},
//     {id:27,name:'morine',monthCreated:3,sex:'female'},
//     {id:28,name:'emeka',monthCreated:3,sex:'male'},
//     {id:29,name:'nick',monthCreated:3,sex:'male'},
//     {id:30,name:'prye',monthCreated:4,sex:'female'},
//     {id:31,name:'odogu',monthCreated:4,sex:'male'},
//     {id:32,name:'wealth',monthCreated:4,sex:'female'},
//     {id:33,name:'joy',monthCreated:4,sex:'female'},
//     {id:34,name:'mmessoma',monthCreated:5,sex:'female'},
//     {id:35,name:'promies',monthCreated:5,sex:'male'},
//     {id:36,name:'david',monthCreated:5,sex:'male'},
//     {id:37,name:'stafne',monthCreated:5,sex:'female'},
//     {id:38,name:'joe',monthCreated:6,sex:'male'},
//     {id:39,name:'doraty',monthCreated:6,sex:'female'},
//     {id:40,name:'savinus',monthCreated:7,sex:'male'},
//     {id:41,name:'daniel',monthCreated:8,sex:'male'},
//     {id:42,name:'anny',monthCreated:8,sex:'female'},
//     {id:43,name:'emmanuel',monthCreated:1,sex:'male'},
//     {id:44,name:'juddy',monthCreated:2,sex:'female'},
// ]
// //total number of male female and all the members registerd
// let maleTotal = 0;
// let femaleTotal = 0;


// const yearFilter = (data,selectedYear)=>{   
//     return data.filter((e)=>e.year = selectedYear)
// }

// const dashboradFilter = (yearFilterdData,selectedYear)=>{
//     // let membersTotal = 0;
//     // membersTotal += data.length;
//     var totalMalePreMonth = []
//     var totalFemalePreMonth = []
    
//     const male = data.filter((e)=> e.sex =='male')
//     const femaleJan = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==1)
//     const femaleFeb = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==2)
//     const femaleMac = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==3)
//     const femaleApl = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==4)
//     const femaleMy = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==5)
//     const femaleJn = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==6)
//     const femaleJl = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==7)
//     const femaleAug = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==8)
//     const femaleSep = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==9)
//     const femaleOct = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==10)
//     const femaleNov = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==11)
//     const femaleDec = data.filter((e)=> e.sex =='female').filter((e)=> e.monthCreated ==12)
    
//     //male
//     const maleJan = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==1)
//     const maleFeb = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==2)
//     const maleMac = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==3)
//     const maleApl = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==4)
//     const maleMy = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==5)
//     const maleJn = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==6)
//     const maleJl = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==7)
//     const maleAug = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==8)
//     const maleSep = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==9)
//     const maleOct = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==10)
//     const maleNov = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==11)
//     const maleDec = data.filter((e)=> e.sex =='male').filter((e)=> e.monthCreated ==12)
//     // const femaleMonth = female.filter((e)=> e.monthCreated == 1)
    
//     // const totalfeb = femaleFeb.reduce(function(x,y){return x+y},0)
//     //male
//     totalMalePreMonth.push(maleJan.length)
//     totalMalePreMonth.push(maleFeb.length)
//     totalMalePreMonth.push(maleMac.length)
//     totalMalePreMonth.push(maleApl.length)
//     totalMalePreMonth.push(maleMy.length)
//     totalMalePreMonth.push(maleJn.length)
//     totalMalePreMonth.push(maleJl.length)
//     totalMalePreMonth.push(maleAug.length)
//     totalMalePreMonth.push(maleSep.length)
//     totalMalePreMonth.push(maleOct.length)
//     totalMalePreMonth.push(maleNov.length)
//     totalMalePreMonth.push(maleDec.length)
    
//     //female
//     totalFemalePreMonth.push(femaleJan.length)
//     totalFemalePreMonth.push(femaleFeb.length)
//     totalFemalePreMonth.push(femaleMac.length)
//     totalFemalePreMonth.push(femaleApl.length)
//     totalFemalePreMonth.push(femaleMy.length)
//     totalFemalePreMonth.push(femaleJn.length)
//     totalFemalePreMonth.push(femaleJl.length)
//     totalFemalePreMonth.push(femaleAug.length)
//     totalFemalePreMonth.push(femaleSep.length)
//     totalFemalePreMonth.push(femaleOct.length)
//     totalFemalePreMonth.push(femaleNov.length)
//     totalFemalePreMonth.push(femaleDec.length)

//     if(selectedYear == new Date().getFullYear()){
//         let finalMale = totalMalePreMonth.slice(0,new Date().getMonth())
//         let finalFemale = totalFemalePreMonth.slice(0,new Date().getMonth())
//         return {male:finalMale,female:finalFemale}
//     }
//     return {male:totalMalePreMonth,female:totalFemalePreMonth}
// }

// console.log(2020 > new Date().getFullYear())
// // console.log(membersTotal)
// // console.log(totalMalePreMonth)
// // console.log(totalFemalePreMonth )
// let gg = [2,3,4,5,6,7]
// console.log(gg.slice(0,5))