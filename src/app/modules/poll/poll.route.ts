import express from "express";
import { PollController } from "./poll.controller";



const route = express.Router();

route.post("/poll/create", PollController.createPoll);



export const PollRoutes = route;
