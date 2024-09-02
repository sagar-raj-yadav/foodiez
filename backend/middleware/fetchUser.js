import "dotenv/config"
import jwt from "jsonwebtoken";

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');

 

    try{
        const {id }=jwt.verify(token, process.env.JWT_SECRET);
        req.userId =id ;
        console.log("fetchuser",req.userId);
        next();
    }
    catch(error){
        console.error("Token verification failed:", error.message);
        res.status(401).json({error:"please autheticate using a valid token"})
    }
}

export default fetchUser;
