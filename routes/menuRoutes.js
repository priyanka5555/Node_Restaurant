const express = require('express')
const router = express.Router();   //manages routes or different different endpoints

const MenuItem = require('./../models/MenuItem');


router.post('/',async (req,res) =>{

    try{
      //jab client data to send karta hai toh body-parser use process/parse karta hai and use req.body me store kar leta hai.
    //Toh hume client ka voh data req.body se milega
    const item = req.body
    //create a new menu document/row using the Mongoose model and data usme daal do
    const newMenuItem = new MenuItem(item);  
    console.log(newMenuItem)
  
    
    //save the new item to the database. 
    const response1 = await newMenuItem.save();
    console.log('new item saved')
    res.status(200).json(response1);
   
  
    }
    // It is important to handle error in catch otherwise when you send data from postman and if there is an error then it won't show any error because we haven't handle it and it will stuck on sending request and nothing will work.
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
  })
   
  // -------------viewMenu-----------------------
  router.get('/',async(req,res)=> {
    try{
      const item = await MenuItem.find();
      console.log('All menu items fetched!');
      res.status(200).json(item);
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
  })


//--------fetch menu item by taste---------------
router.get('/:taste', async(req,res)=> {
    try
    {
        const taste = req.params.taste;
        if(taste == 'sweet' || taste == 'sour' || taste == 'spicy'){
            const response = await MenuItem.find({taste:taste});
            console.log("Menu item filtered according to food type")
            res.status(200).json(response)
        }
        else{
            res.status(404).json({error:'Invalid food type'})
        }
    }
    catch(err){
        console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
    
    
})

//---------update menu info---------------------
router.put('/:id', async (req, res) => {
    try {
      const menuId = req.params.id;  //Extract person's id from the url parameter
      const updatedMenuData = req.body;  //updated data for the person
  
      const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
        new: true,  //Return the updated document
        runValidators: true,  //Run Mongoose validation
      })
  
      if (!response) {
        return res.status(404).json("Item not found")
      }
  
      console.log('data updated');
      res.status(200).json(response);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
  
  //---------delete menu info---------------------
  router.delete('/:id', async(req,res) => {
      try{
        const menuId = req.params.id;   //Extract person's id from the url parameter
  
        //Works if you have data inside person document/table
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
          return res.status(404).json({error : 'Item not found'})
        }
        console.log('data deleted successfully!')
        res.status(200).json({message: "selected Item deleted successfully"});
  
      }
      catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
      }
  })
  
module.exports = router;   //middleware
