import { Schema, model, Document, Types } from "mongoose";

export interface IFavoriteContact extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  phone?: string;
  email?: string;
}

const FavoriteContactSchema = new Schema<IFavoriteContact>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

export default model<IFavoriteContact>("FavoriteContact", FavoriteContactSchema);
