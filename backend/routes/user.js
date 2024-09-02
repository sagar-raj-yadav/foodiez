

    const {name,email,password}=req.body;  //desctructuring name,email,password from body
    try{
         // Check if all fields are provided
        if(!name || !email || !password ){
            return res.status(400).json({error:"All fields are required"});
        }

        // Validate email format
        if(!email.includes("@")){
            return res.status(400).json({error:"Invalid email"});
        }

        

        // Validate password length
        if(password.length<6){
            return res.status(400).json({error:"password length must me greater than 6"});
        }
        
         // Check if email already exists
        const finduser=await User.findOne({email});

        if(finduser){
            return res.status(400).json({error:"Email already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser= new User({name,email,password:hashedpassword});
        await newuser.save();
        console.log(newuser);
        res.status(201).json({success:"signup sccessfull"});

    }
    catch(error){
        console.log(error);
        res.status(500).json("Internal server Error");
    }

});



//login 
router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
        if( !email || !password){
            return res.status(400).json({error:"All fields are required"});
        }

        if(!email.includes("@")){
            return res.status(400).json({error:"Invalid email"});
        }

        const finduser=await User.findOne({email});

        if(!finduser){
            return res.status(400).json({error:"user not find"});
        }

        const matchpassword=await  bcrypt.compare(password,finduser.password);

        if(matchpassword){
            const token=await jwt.sign({id:finduser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(201).json({token,success:"login seccessfull"});
        }
        else{
            res.status(404).json({error:"Incorrect email or password"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error");

    }
});


//router 3 ->user ke id se user ka data get karenge
router.get("/getuser",fetchUser,async (req,res)=>{
    try{
      const  userId=req.userId;
      console.log("getuser",userId);

        const user=await User.findById(userId).select("-password");  //selecting all fields except password
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
        console.log("getuser", user)
    }
catch(error){
    console.log(error);
    res.status(500).send("Internal server error");
}

});

export default router;


// User -> yaha pe ye User me U bada rahega , nii to error aayega , 
// model me user me u ko bada likho ya chota isse farq nii padega , but yaha pe U ko bada hi likhna .

