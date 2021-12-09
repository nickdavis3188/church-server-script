const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const http = require('http');
const router = express.Router();
const app = require('./app');

// Connecting to the database
const {DATABASE_LOCAL,DB_URL} = process.env;
//let DB= (process.env.NODE_ENV !== "production")?DB_URL:DATABASE_LOCAL
let DB2 = 'mongodb://localhost:27017/DTMDMS'
let DB = 'mongodb+srv://Dtmdms:5XnU9tD5tP9XIVfw@dtmdms.li78v.mongodb.net/Dtmdms?retryWrites=true&w=majority'
//let DB = 'mongodb+srv://nick:8YloyZM18f0Wkg7n@cluster0.atigc.mongodb.net/DTMDMS?retryWrites=true&w=majority';
//let DB = process.env.DB_URL;
//if (process.env.NODE_ENV === 'production') {
  // DB = process.env.DB_URL;
//}

let myDb = (process.env.NODE_ENV !== "production")?DB2:DB

mongoose.connect(myDb, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((e) =>{
  return console.log('DB Connection Successful')
})
.catch((err) => console.log(err));

// Instantiate the HTTP server
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Start the HTTP server
server.listen(port, function () {
  console.log(`Application running on port ${port}`);
});
