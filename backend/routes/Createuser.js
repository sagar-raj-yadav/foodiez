const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtsecret="Mynamamnbaahjhasjahjaskahsjhkahsajhskaakahjasj";


//signup
router.post('/createuser',  
    body('email','please enter valid email').isEmail(),
    body('name','please enter name').isLength({ min: 5 }),
    body('password',"incorrect password").isLength({ min: 5 }),
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const salt=await bcrypt.genSalt(10);
        let securePassword=await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name:req.body.name,
            password:securePassword,
            email:req.body.email,
            location:req.body.location
        }).then(res.json({ success: true }));
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

//login

router.post('/loginuser',[
    body('email').isEmail(),
    body('password',"incorrect password").isLength({ min: 5 })],

    async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email=req.body.email;

    try {
      let userdata=  await User.findOne({email});
      if(!userdata){
        return  res.status(400).json({ errors: "please enter correct email" });
      }
      const passwordCompare=await bcrypt.compare(req.body.password,userdata.password);   // bcrypt.compare -> this compare original password to hashed password
     
      if(!passwordCompare){
        return  res.status(400).json({ errors: "please enter correct password" });
      }

      const data={
        user:{
            id:userdata.id
        }
      }

      const authToken=jwt.sign(data,jwtsecret);
     
        return  res.json({ success:true,authToken:authToken });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

module.exports = router;

// User -> yaha pe ye User me U bada rahega , nii to error aayega , 
// model me user me u ko bada likho ya chota isse farq nii padega , but yaha pe U ko bada hi likhna .

