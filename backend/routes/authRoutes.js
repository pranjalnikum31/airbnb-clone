import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";

const router = express.Router();

router.post("/signup",async (req,res) => {
    try {
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message:"user already exist"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user =new User({
            name,
            email,
            password:hashedPassword
        })
        await user.save();
        res.status(201).json({
            message:"user created successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
    
})
export default router;