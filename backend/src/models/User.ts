import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  refreshTokens: string[];
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  passwordResetUsed?: boolean;
  lastLocation?: { type: "Point"; coordinates: [number, number] };
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshTokens: { type: [String], default: [] },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    passwordResetUsed: { type: Boolean, default: false },
    lastLocation: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: { type: [Number], required: false },
    },
  },
  { timestamps: true }
);

UserSchema.index({ lastLocation: "2dsphere" });

export default model<IUser>("User", UserSchema);
