let tt = new Date("2017-03-04T23:00:00.000Z")
console.log(tt.toLocaleDateString()  )
//const mongoose = require('mongoose')
 //const shortid = require('shortid');
 //const Journeyee = require('./models/JourneyModel')

//////////////////////////////////////////////////////////////////////////////////////
// const datass = [
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:2,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:2,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:2,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:2,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:2,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:2,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:2,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:3,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:3,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:3,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:3,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:3,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:3,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:4,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:4,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:4,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:4,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:4,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:4,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:5,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:5,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2021},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'female',monthCreated:1,Year:2020},
// 	{Surname:'Joe',Firstname:'Sam',PhoneNo:080978867,Sex:'male',monthCreated:1,Year:2020}
// ]


//mongoose.connect('mongodb://localhost:27017/DTMDMS', {//TESTING22
//  useCreateIndex: true,
//  useFindAndModify: false,
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//})
//.then((e) =>{
 // return console.log('DB Connection Successful')
//})
//.catch((err) => console.log(err));

// const postSchema = new mongoose.Schema(
//   {
// 	Author:{ type: mongoose.Schema.ObjectId, ref: 'Author' },
// 	Comments:{ type: mongoose.Schema.ObjectId, ref: 'comment' },
	
// },
//   { timestamps: true }
// )

// const posts = mongoose.model('post', postSchema);

// //let isnum = /^\d+$/.test("gh4566");
// //console.log(isnum)

// //const regex = 'joe';

// const AuthorSchema = new mongoose.Schema(
//   {
//     Name:String,
	
// },
//   { timestamps: true }
// )
// const author3 = mongoose.model('Author', AuthorSchema);
// const commentSchema = new mongoose.Schema(
//   {
//     body:String,
	
// },
//   { timestamps: true }
// )
// const commens3 = mongoose.model('comment', commentSchema);



//const journeySchema = mongoose.Schema({
 //   JourneyName:{
//        type:String,
 //       required: true,
//    },
//    JourneyPriority:{
 //       type:Number,
 ////       required: true,
 //   },
   

//})


// const journey = mongoose.model('journey',journeySchema);

// const saveComment = async()=>{
// 	const comments = await journey.create({
// 		JourneyName:"Journey 101",
// 		JourneyPriority:1
// 	})
// 	if(comments){
// 		const authors =	await author3.create({
// 			Name:'Davis'
// 		})
// 		if(authors){
// 			await posts.create({
// 			Author:authors._id,
// 			Comments:comments._id
// 			}) 
// 		}
		
// 	}
	
// }

// saveComment()




//Journeyee.find()
//.populate('Author')
//.populate('Comments')
//.exec()
//.then((ddd)=>{
//	if(ddd.length >= 1){
//		console.log(ddd)
//	}else{
//		console.log('not found')
//	}			
//})
//.catch((err)=>{
//	if(err){
//		console.log(err)
//	}
//}) 

