//  responsible to build connection between db and nodejs

const mongoose = require('mongoose'); //act as a bridge

//Define the MongoDB connecction URL
const mongoURL = "mongodb://localhost:27017/resturants"  //resturants is my db

//set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose manintains a default connection object representing thr MongoDB connection

const db = mongoose.connection;    //db is an object

//Define event listeners for database connection
db.on('connected', () => {
    console.log("connected to MongoDB server");
});

db.on('error', (err) => {
    console.log('connected to MongoDB server')
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
});

//Till now we have established/written everything in db file but still db is not connected with nodejs. To do thst we also need to export it and run it.

//Export the database connection
module.exports = db;

