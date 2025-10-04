import { Schema,model } from "mongoose";

const ChatSchema=new Schema({
    user:{type:Schema.Types.ObjectId, ref:"User"},
    prompt:String,
    response:String
},{timestamps:true});

export default model("Chat",ChatSchema);