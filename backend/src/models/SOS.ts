import { Schema, model, Document } from "mongoose";

export interface ISOS extends Document {
  user?: Schema.Types.ObjectId;
  message?: string;
  location: { type: string; coordinates: [number, number] };
  contactsSentTo?: string[];
  status: "pending" | "notified" | "closed";
}

const SOSSchema = new Schema<ISOS>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: { type: [Number], index: "2dsphere" },
    },
    contactsSentTo: [String],
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default model<ISOS>("SOS", SOSSchema);
