import {Request,Response} from 'express'
import User from '../models/User'

export async function me(req:Request & any,res:Response) {
    try{
        const userId=req.userId;
        const user=await User.findById(userId).select("-passwordhash -refreshTokens");
        if(!user) return res.status(404).json({message:"User not found"});
        res.json({user});
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }
}

export async function updateLocation(req:Request & any,res:Response){
    try{
        const userId=req.userId;
        const {lng,lat}=req.body;
        if(typeof lng!=='number' || typeof lat!=='number') return res.status(404).json({message:"Invalid coordinates"});

        const user=await User.findByIdAndUpdate(userId, {
            lastLocation:{ type:"Point", coordinates: [lng,lat] }
        }, {
            new:true
        }).select("-passwordhash -refreshTokens");
        res.json({user});
    } catch(err){
        res.status(500).json({message:"Server Error"});
    }
}