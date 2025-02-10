const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json());  //req.body




app.get('/', (req, res) => {
  res.send('hello world')
})
//req - isme voh data hota hai jo client server ko bhejta hai. It could be in any format Json, form data, etc but mostly we send it in JSON 
//res - isme voh data hota hai jo server client ko bhejta hai




//--------Import the router files--------------------
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//use the routers
app.use('/person',personRoutes)
app.use('/menu', menuRoutes)


app.listen(3000, () => {
    console.log("listening on port 3000")
})