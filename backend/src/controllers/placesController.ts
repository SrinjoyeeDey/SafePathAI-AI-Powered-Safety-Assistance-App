import {Request,Response} from 'express'
import axios from 'axios'
import Place from '../models/Place'

export async function nearby(req:Request,res:Response){
    try{
        const lat=parseFloat(req.query.lat as string);
        const lng=parseFloat(req.query.lat as string);
        const type=(req.query.type as string || 'hospital');
        const limit=parseInt((req.query.limit as string) || '8',10);

        if(!lat || !lng) return res.status(400).json({message:"Latitude and Longitude are required"});

        const cached=await Place.find({type,location:{$near:{$geometry:{type:"Point",coordinates: [lng,lat]} , $maxDistance:5000}}}).limit(limit);

        if(cached && cached.length>0){
            return res.json({places:cached});
        }

        const token=process.env.MAPBOX_API_KEY;
        if(!token) return res.status(500).json({message:"Mapbox token not configured"});

        const q=encodeURIComponent(type);
        const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?proximity=${lng},${lat}&types=poi&limit=${limit}&access_token=${token}`;
        const r=await axios.get(url);
        const features=r.data.features || [];
        const places=features.map((f:any)=>({
            name:f.text,
            address:f.place_name,
            coordinates:[f.center[0],f.center[1]]
        }));

        for(const p of places){
            await Place.create({
                name:p.name,
                type,
                address:p.address,
                location:{ type:"Point", coordinates:p.coordinates},
                source:'mapbox'
            }).catch(()=>{
                // ignore duplicates
            });
        }
        res.json({places});
    } catch(err){
        console.error(err);
        res.status(500).json({message:"Server error fetching places"});
    }
}