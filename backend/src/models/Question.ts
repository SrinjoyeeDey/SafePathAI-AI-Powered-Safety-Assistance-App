import { Schema, model, Document, Types } from "mongoose";

export interface IAnswer extends Document {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  upvotes: number;
  upvotedBy: Types.ObjectId[];
  downvotes?: number;
  downvotedBy?: Types.ObjectId[];
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion extends Document {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  title: string;
  description?: string;
  category?: string;
  answers: Types.DocumentArray<IAnswer>;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  upvotedBy: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  downvotes: { type: Number, default: 0 },
  downvotedBy: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  isAccepted: { type: Boolean, default: false },
}, { timestamps: true });

const QuestionSchema = new Schema<IQuestion>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, index: true },
  description: { type: String },
  category: { type: String, default: "General" },
  answers: { type: [AnswerSchema], default: [] },
}, { timestamps: true });

export default model<IQuestion>("Question", QuestionSchema);


