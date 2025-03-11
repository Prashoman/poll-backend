import AppError from "../../errors/AppError";
import { TPoll } from "./poll.interface";
import { Poll } from "./poll.model";
import httpStatus from "http-status";
import slugify from "slugify";

const createPollIntoDB = async (payload: TPoll) => {
  payload.slug = slugify(payload.question, { lower: true });
  // console.log("payload", payload);
  const matchPoll = await Poll.findOne({ slug: payload.slug });
  if (matchPoll) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Poll already exists with this slug"
    );
  }
  const result = await Poll.create(payload);
  return result;
};

const getPollsFromDB = async (slug: string) => {
  if (slug) {
    const polls = await Poll.find({ slug });
    return polls;
  }
  const polls = await Poll.find().sort({ createdAt: -1 });
  return polls;
};

const updatePollInDB = async (slug: string, payload: string) => {
  const poll = await Poll.findOne({ slug });
  if (!poll) {
    throw new AppError(httpStatus.NOT_FOUND, "Poll not found");
  }
  poll.options.forEach((option) => {
    if (option.text === payload) {
      option.votes += 1;
    }
  });
  poll.totalVotes += 1;
  const result = await Poll.findOneAndUpdate({ slug }, poll, { new: true });
  return result;
};

const updatePollReactionsInDB = async (slug: string, payload: string) => {
  const poll = await Poll.findOne({ slug });
  if (!poll) {
    throw new AppError(httpStatus.NOT_FOUND, "Poll not found");
  }

  if (payload === "like") {
    poll.reactions.like += 1;
    poll.totalLikes += 1;
  } else {
    poll.reactions.fire += 1;
  }

  const result = await Poll.findOneAndUpdate(
    {
      slug,
    },
    poll,
    { new: true }
  );
  return result;
};

const updatePollCommentInDB = async (slug: string, payload: string) => {
  const poll = await Poll.findOne({ slug });
  if (!poll) {
    throw new AppError(httpStatus.NOT_FOUND, "Poll not found");
  }
  poll.comments.push({ text: payload, createdAt: new Date() });
  const result = await Poll.findOneAndUpdate(
    {
      slug,
    },
    poll,
    { new: true }
  );
  return result;
};


const getPollsByUserId = async (userId: string) => {
  // console.log("userId", userId);
  
  const polls = await Poll.find({ userId });
  return polls;
}

export const PollService = {
  createPollIntoDB,
  getPollsFromDB,
  updatePollInDB,
  updatePollReactionsInDB,
  updatePollCommentInDB,
  getPollsByUserId
};
