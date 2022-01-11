const compression = require('compression');
const express = require('express');
var cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');


const membersRouter = require('./routes/membersRoutes')
const membersDashboradRouter = require('./routes/dashboradRoutes')
const adminRouter = require('./routes/adminRoutes');
const authRouter = require('./routes/authRoutes')
const seachRouter = require("./routes/searchRoutes")
const journeyRouter = require("./routes/journeyRoutes")
const journeyDate = require("./routes/journeyDateRoutes")
const report = require("./routes/reportRoutes")

const app = express();
//Body parser
app.use(express.json({limit:2000000}));
app.use(express.urlencoded({limit:2000000, extended: true }))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

//Serve static file
app.use("/publicFile",express.static("publicFile"))


// enable cors for all route
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
//app.use(cors())

//app.use((req,res,next)=>{
	//allow cross access
///	res.header('Access-Control-Allow-Origin','*');
//	res.header('Access-Control-Allow-Headers','Origin,X-Reqested-With,Content-Type,Accept,Authorization')
//	
//	//cheack for request
//	if(req.method === 'OPTIONS'){
//		res.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH');
//		return res.status(200).json({});
////		next();
//	}
//})

//ROUTES
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/member',membersRouter);
app.use('/api/v1/dashborad',membersDashboradRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/search',seachRouter);
app.use('/api/v1/journey',journeyRouter);
app.use('/api/v1/journeyDate',journeyDate);
app.use('/api/v1/report',report);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
