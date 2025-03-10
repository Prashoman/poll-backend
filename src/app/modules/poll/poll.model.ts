import { model, Schema } from "mongoose";
import { TPoll } from "./poll.interface";
import slugify from "slugify";

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
  },
  {
    timestamps: true,
  }
);

pollSchema.pre("save", function (next) {
    const poll = this;
  if(poll.question){
    poll.slug = slugify(poll.question, { lower: true });
  }
  next();
});

export const Poll = model<TPoll>("Poll", pollSchema);
