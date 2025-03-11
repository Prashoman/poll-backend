"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const poll_model_1 = require("./poll.model");
const http_status_1 = __importDefault(require("http-status"));
const slugify_1 = __importDefault(require("slugify"));
const createPollIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.slug = (0, slugify_1.default)(payload.question, { lower: true });
    // console.log("payload", payload);
    const matchPoll = yield poll_model_1.Poll.findOne({ slug: payload.slug });
    if (matchPoll) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Poll already exists with this slug");
    }
    const result = yield poll_model_1.Poll.create(payload);
    return result;
});
const getPollsFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    if (slug) {
        const polls = yield poll_model_1.Poll.find({ slug });
        return polls;
    }
    const polls = yield poll_model_1.Poll.find().sort({ createdAt: -1 });
    return polls;
});
const updatePollInDB = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const poll = yield poll_model_1.Poll.findOne({ slug });
    if (!poll) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Poll not found");
    }
    poll.options.forEach((option) => {
        if (option.text === payload) {
            option.votes += 1;
        }
    });
    poll.totalVotes += 1;
    const result = yield poll_model_1.Poll.findOneAndUpdate({ slug }, poll, { new: true });
    return result;
});
const updatePollReactionsInDB = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const poll = yield poll_model_1.Poll.findOne({ slug });
    if (!poll) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Poll not found");
    }
    if (payload === "like") {
        poll.reactions.like += 1;
        poll.totalLikes += 1;
    }
    else {
        poll.reactions.fire += 1;
    }
    const result = yield poll_model_1.Poll.findOneAndUpdate({
        slug,
    }, poll, { new: true });
    return result;
});
const updatePollCommentInDB = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const poll = yield poll_model_1.Poll.findOne({ slug });
    if (!poll) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Poll not found");
    }
    poll.comments.push({ text: payload, createdAt: new Date() });
    const result = yield poll_model_1.Poll.findOneAndUpdate({
        slug,
    }, poll, { new: true });
    return result;
});
const getPollsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("userId", userId);
    const polls = yield poll_model_1.Poll.find({ userId });
    return polls;
});
exports.PollService = {
    createPollIntoDB,
    getPollsFromDB,
    updatePollInDB,
    updatePollReactionsInDB,
    updatePollCommentInDB,
    getPollsByUserId
};
