import { Schema, model } from "mongoose";

interface IFavoriteContact {
  user: Schema.Types.ObjectId;
  name: string;
  phone: string;
  email?: string;
}

const favoriteContactSchema = new Schema<IFavoriteContact>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
  },
  { timestamps: true }
);

export default model<IFavoriteContact>(
  "FavoriteContact",
  favoriteContactSchema
);
