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

const app = express();
//Body parser
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

//Serve static file
app.use("/public",express.static("public"))


// enable cors for all route
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
//app.use(cors())

//ROUTES
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/member',membersRouter);
app.use('/api/v1/dashborad',membersDashboradRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/search',seachRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
