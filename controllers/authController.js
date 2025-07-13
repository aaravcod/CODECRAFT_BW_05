import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

export const register = async (req,res)=>{
    const {name,email,password, role}=req.body;

    const existing=await Prisma.User.findUnique({where:{email}});
    if(existing){return res.status(400).json({message:"User already Exist"})}

    const hashedpassword=await bcrypt.hash(password,10);
    const user=await Prisma.User.create({
        data:{name , email, password: hashedpassword , role}
    });

    const token=generateToken(user);
    res.status(201).json({token});
};

export const login = async (req,res) => {
    const {email, password}= req.body;
    
    const user= await Prisma.User.findUnique({where:email});
    if(!user){return res.status(404).json({message:"User Not Found"})};

    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch){return res.status(401).json({message:"Invalid Credentials"})}

    const token =generateToken(user);
    return res.status(200).json({
        
        message:"Logged In",
        token: token

    })
    
};