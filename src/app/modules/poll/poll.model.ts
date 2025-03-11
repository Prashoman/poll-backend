import { model, Schema } from "mongoose";
import { TPoll } from "./poll.interface";


const pollSchema = new Schema<TPoll>(
  {
    question: { type: String, required: true },
    slug: { type: String },
    options: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    expiresAt: { type: Date, required: true },
    hideResults: { type: Boolean, default: false },
    reactions: {
      fire: { type: Number, default: 0 },
      like: { type: Number, default: 0 },
    },
    comments: [
      {
        text: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    totalVotes: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    expired: { type: Boolean, default: false },
    userId: { type: String , default: ""},
    pollType: { type: String, default: "public" },
  },
  {
    timestamps: true,
  }
);



export const Poll = model<TPoll>("Poll", pollSchema);
