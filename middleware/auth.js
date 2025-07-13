import jwt from "jsonwebtoken";


export const protect = (req,res,next)=>{
    const auth=req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')){return res.status(401).json({message:'Unauthorized'})};

    try{
        const token = auth.split(' ')[1];
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({message:"Invalid Token"});
    }

}