import {Schema,model,Document,Types} from 'mongoose'

export interface IUser extends Document {
    _id: Types.ObjectId; 
    name:string,
    email:string,
    passwordHash:string,
    role:"user" | "admin";
    refreshTokens:string[];
    lastLocation?:{type:"Point"; coordinates:[number,number]};
}

const UserSchema=new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,index:true},
    passwordHash:{type:String,required:true}, //stores the hashed password
    role: {
        type:String, enum:["user","admin"],default:"user"
    },
    refreshTokens:{type:[String],default:[]}, //to store a valid refresh tokens so you can revoke a specific refresh token
    lastLocation:{
        type:{
            // type:String,enum:["Point"],default:"Point" //follows GeoJSON
            type:String,enum:["Point"], //follows GeoJSON
        },
        coordinates:{type:[Number],index:"2dsphere",required:false}
    }
},{timestamps:true});

UserSchema.index({"lastLocation":"2dsphere"})

export default model<IUser>("User",UserSchema)