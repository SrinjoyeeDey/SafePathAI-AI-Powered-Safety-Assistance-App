import { Schema, model, Types, Document } from "mongoose";

export interface ICheckIn extends Document {
  user: Types.ObjectId;
  dueAt: Date; // when the user should confirm by
  confirmedAt?: Date | null; // when user confirmed
  status: "pending" | "confirmed" | "missed";
  note?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

const checkInSchema = new Schema<ICheckIn>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    dueAt: { type: Date, required: true, index: true },
    confirmedAt: { type: Date, default: null },
    status: { type: String, enum: ["pending", "confirmed", "missed"], default: "pending", index: true },
    note: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

export default model<ICheckIn>("CheckIn", checkInSchema);
