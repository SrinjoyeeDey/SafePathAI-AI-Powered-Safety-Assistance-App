import { Schema, model, Document } from 'mongoose';

interface IFavoriteContact extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  phone?: string;
  email?: string;
}

const FavoriteContactSchema = new Schema<IFavoriteContact>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
}, { timestamps: true });

export default model<IFavoriteContact>('FavoriteContact', FavoriteContactSchema);