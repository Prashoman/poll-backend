import express from "express";
import { PollController } from "./poll.controller";



const route = express.Router();

route.post("/poll/create", PollController.createPoll);
route.get("/polls/:slug?", PollController.getPolls);
route.patch("/polls/:slug", PollController.updatePoll);
route.patch("/polls-reactions/:slug", PollController.updatePollReactions);
route.patch("/polls-comment/:slug", PollController.updatePollComment);


export const PollRoutes = route;
