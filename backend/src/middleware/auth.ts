import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request{
    userId?:string;
}
export function authenticate(req:AuthRequest,res:Response,next:NextFunction){
    const header=req.headers.authorization;
    if(!header) return res.status(401).json({message:"No authorization header"});
    const token=header.split(" ")[1];
    try{
        const payload=jwt.verify(token,process.env.JWT_ACCESS_SECRET!) as any;
        req.userId=payload.userId;
        next();
    } catch(err){
        return res.status(401).json({message:"Invalid or expired token"});
    }
}

// Middleware reads Bearer token, verifies it and places userId on req for controllers