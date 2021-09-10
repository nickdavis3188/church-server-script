let tt = new Date("2017-03-04T23:00:00.000Z")
console.log(tt.toLocaleDateString()  )

//////////////////////////////////////////////////////////////////////////////////////////TABLE
 <table className="table table-hover table-outline d-none d-sm-table">
	<thead className="thead-light">
	  <tr>
		<th className="text-center"><CIcon name="cil-people" /></th>
		<th className="text-center">Member</th>
		<th className="text-center">PhoneNo</th>
		<th className="text-center">Email</th>
		<th className="text-center">Journey Progress</th>
	  </tr>
	</thead>
	<tbody>
		<tr onClick={()=>  history.push(`/users/${item.id}`)}>
			<td className="text-center">
			  <div className="c-avatar">
				<img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
				<span className="c-avatar-status bg-success"></span>
			  </div>
			</td>
			
			<td>
			  <div>Yiorgos Avraamu</div>
			  <div className="small text-muted">
				<span>New</span> | Registered: Jan 1, 2015
			  </div>
			</td>
			
			<td>
			  <strong>09036103607</strong>
			</td>
			
			<td>
			  <strong>nickdavis3188@gmail.com</strong>
			</td>
			
			<td>
			  <div className="clearfix">
				<div className="float-left">
				  <strong>50%</strong>
				</div>
			  </div>
			  <CProgress className="progress-xs" color="success" value="50" />
			</td>
			
		</tr>
	</tbody>
</table>





////////////////////////////////////////////////////////////////////////////////////////////////TABLE

<div class="well">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#home" data-toggle="tab">Profile</a></li>
      <li><a href="#profile" data-toggle="tab">Password</a></li>
    </ul>
    <div id="myTabContent" class="tab-content">
      <div class="tab-pane active in" id="home">
        <form id="tab">
            <label>Username</label>
            <input type="text" value="jsmith" class="input-xlarge">
            <label>First Name</label>
            <input type="text" value="John" class="input-xlarge">
            <label>Last Name</label>
            <input type="text" value="Smith" class="input-xlarge">
            <label>Email</label>
            <input type="text" value="jsmith@yourcompany.com" class="input-xlarge">
            <label>Address</label>
            <textarea value="Smith" rows="3" class="input-xlarge">2817 S 49th
    Apt 314
    San Jose, CA 95101
            </textarea>
            <label>Time Zone</label>
            <select name="DropDownTimezone" id="DropDownTimezone" class="input-xlarge">
              <option value="-12.0">(GMT -12:00) Eniwetok, Kwajalein</option>
              <option value="-11.0">(GMT -11:00) Midway Island, Samoa</option>
              <option value="-10.0">(GMT -10:00) Hawaii</option>
              <option value="-9.0">(GMT -9:00) Alaska</option>
              <option selected="selected" value="-8.0">(GMT -8:00) Pacific Time (US & Canada)</option>
              <option value="-7.0">(GMT -7:00) Mountain Time (US & Canada)</option>
              <option value="-6.0">(GMT -6:00) Central Time (US & Canada), Mexico City</option>
              <option value="-5.0">(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima</option>
              <option value="-4.0">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
              <option value="-3.5">(GMT -3:30) Newfoundland</option>
              <option value="-3.0">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
              <option value="-2.0">(GMT -2:00) Mid-Atlantic</option>
              <option value="-1.0">(GMT -1:00 hour) Azores, Cape Verde Islands</option>
              <option value="0.0">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
              <option value="1.0">(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris</option>
              <option value="2.0">(GMT +2:00) Kaliningrad, South Africa</option>
              <option value="3.0">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
              <option value="3.5">(GMT +3:30) Tehran</option>
              <option value="4.0">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
              <option value="4.5">(GMT +4:30) Kabul</option>
              <option value="5.0">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
              <option value="5.5">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
              <option value="5.75">(GMT +5:45) Kathmandu</option>
              <option value="6.0">(GMT +6:00) Almaty, Dhaka, Colombo</option>
              <option value="7.0">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
              <option value="8.0">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
              <option value="9.0">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
              <option value="9.5">(GMT +9:30) Adelaide, Darwin</option>
              <option value="10.0">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
              <option value="11.0">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
              <option value="12.0">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
            </select>
          	<div>
        	    <button class="btn btn-primary">Update</button>
        	</div>
        </form>
      </div>
      <div class="tab-pane fade" id="profile">
    	<form id="tab2">
        	<label>New Password</label>
        	<input type="password" class="input-xlarge">
        	<div>
        	    <button class="btn btn-primary">Update</button>
        	</div>
    	</form>
      </div>
  </div>




///////////////////////////////////////////
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

