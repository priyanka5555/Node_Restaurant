const express = require('express')
const router = express.Router();   //manages routes or different different endpoints


const Person = require('./../models/Person')



//req - isme voh data hota hai jo client server ko bhejta hai. It could be in any format Json, form data, etc but mostly we send it in JSON 
//res - isme voh data hota hai jo server client ko bhejta hai

//-----------store person info coming from browser into db----------------------------------
router.post('/', async (req, res) => {
  try {
    //jab client data to send karta hai toh body-parser use process/parse karta hai and use req.body me store kar leta hai.
    //Toh hume client ka voh data req.body se milega
    const data = req.body

    //create a new person document/row using the Mongoose model and data usme daal do
    const newPerson = new Person(data);

    //save the new person to the database. 
    const response = await newPerson.save();
    console.log('data saved')
    res.status(200).json(response);


  }
  // It is important to handle error in catch otherwise when you send data from postman and if there is an error then it won't show any error because we haven't handle it and it will stuck on sending request and nothing will work.
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }

})


  -
  //-----------Get method to get the all person info from database-------------------------------------------------------
  router.get('/', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('data fetched!');
      res.status(200).json(data);

    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })


// --------get person info having specific work type ------------------------------
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;  //Extract work type from the url

    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType });
      console.log("data fetched according to work type");
      res.status(200).json(response);
    }

    else {
      res.status(404).json({ error: 'Invalid work type' })
    }


  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


//---------update person info---------------------
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;  //Extract person's id from the url parameter
    const updatedPersonData = req.body;  //updated data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,  //Return the updated document
      runValidators: true,  //Run Mongoose validation
    })

    if (!response) {
      return res.status(404).json("Person not found")
    }

    console.log('data updated');
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//---------delete person info---------------------
router.delete('/:id', async(req,res) => {
    try{
      const personID = req.params.id;   //Extract person's id from the url parameter

      //Works if you have data inside person document/table
      const response = await Person.findByIdAndDelete(personID);
      if(!response){
        return res.status(404).json({error : 'Person not found'})
      }
      console.log('data deleted successfully!')
      res.status(200).json({message: "selected person info deleted successfully"});

    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router;