import express from 'express';
const router=express.Router();
import fetchUser from '../middleware/fetchUser.js';  //middleware
import Blog from '../models/Blog.js';  //notes model

//route 1
router.post("/addblog",fetchUser,async (req,res)=>{
    try{
        const {title,description,tag}=req.body;
        if(!title || !description || !tag){
            return res.status(400).json({error:"All fields are required"});
        }

        const blogs=await Blog({title,description,tag,user:req.userId});

        const savedblog=await blogs.save();
        res.json(savedblog);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error")
    }

})

//route 2
router.get('/fetchallblog',fetchUser,async (req,res)=>{
    try{
        const blogs=await Blog.find({user:req.userId});  //Notes ->model
        res.json(blogs);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error");
    }
})


//route 3
router.put("/updateblog/:id",fetchUser,async (req,res)=>{

    const {title,description,tag}=req.body;
    const {id}=req.params;

    try{
        let blog=await Blog.findById({_id:id});

        if(!blog){
            return res.status(404).send("blog not found");
        }
        if(blog.user.toString()!==req.userId){
            return res.status(401).send("this user Not Allowed to delete this blog");
        }

        const blogs=await Notes.findByIdAndUpdate({_id:id},{
            $set:{title,description,tag}  //set -> ye mongodb ka method h
        });

        res.json({blogs,success:"Notes updated successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

//router 4
router.delete("/deleteblog/:id",fetchUser,async (req,res)=>{
    try{
        let blog=await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).send("blog not found");
        }

        if(blog.user.toString()!==req.userId){
            return res.status(401).send("this user Not Allowed to delete this blog");
        }

        blog=await Blog.findByIdAndDelete(req.params.id);
        res.json({"success": "Note has been deleted",blog:blog});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

//router 5
router.get("/getblog/:id",fetchUser,async (req,res)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findById({_id:id});
        if(blog){
            return res.status(200).json(blog);
        }
        else{
            return res.status(404).send("Blog not found");
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error");
    }
})
export default router;