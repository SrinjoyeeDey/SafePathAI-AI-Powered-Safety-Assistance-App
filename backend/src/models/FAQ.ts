import { Schema, model, Document } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: "General" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default model<IFAQ>("FAQ", FAQSchema);


