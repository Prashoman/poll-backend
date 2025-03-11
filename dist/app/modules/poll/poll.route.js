"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollRoutes = void 0;
const express_1 = __importDefault(require("express"));
const poll_controller_1 = require("./poll.controller");
const route = express_1.default.Router();
route.post("/poll/create", poll_controller_1.PollController.createPoll);
route.get("/polls/:slug?", poll_controller_1.PollController.getPolls);
route.patch("/polls/:slug", poll_controller_1.PollController.updatePoll);
route.patch("/polls-reactions/:slug", poll_controller_1.PollController.updatePollReactions);
route.patch("/polls-comment/:slug", poll_controller_1.PollController.updatePollComment);
route.get("/pollsByUser/:userId", poll_controller_1.PollController.getPollByUserId);
exports.PollRoutes = route;
