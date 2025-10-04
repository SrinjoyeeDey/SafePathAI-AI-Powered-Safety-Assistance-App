import {Schema,model,Document} from 'mongoose'

export interface IPlace extends Document {
    name:string,
    type:string,
    address?:string,
    location: {type:string; coordinates:[number,number]};
    source?:string;
}

const PlaceSchema=new Schema<IPlace>({
    name:String,
    type:String,
    address:String,
    location:{
        type:{type:String,default:"Point"},
        coordinates:{type:[Number],index:"2dsphere"}
    },
    source:String
},{timestamps:true});

PlaceSchema.index({"location":"2dsphere"})

export default model<IPlace>("Place",PlaceSchema);