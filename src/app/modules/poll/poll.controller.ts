import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PollService } from "./poll.service";

const createPoll = catchAsync(async (req: Request, res: Response) => {

    const poll = await PollService.createPollIntoDB(req.body);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Like created successfully",
    data: poll,
  });
});


const getPolls = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const polls = await PollService.getPollsFromDB(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Polls fetched successfully",
    data: polls,
  });
})

const updatePoll = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const poll = await PollService.updatePollInDB(slug, req.body.optionText);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Poll updated successfully",
    data: poll,
  });
})

const updatePollReactions = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const poll = await PollService.updatePollReactionsInDB(slug, req.body.reaction);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Poll reactions updated successfully",
    data: poll,
  });
}
)

const updatePollComment = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const poll = await PollService.updatePollCommentInDB(slug, req.body.comment);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Poll comment updated successfully",
    data: poll,
  });
})

const getPollByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  // console.log("CuserId", userId);
  
  const polls = await PollService.getPollsByUserId(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Polls fetched successfully",
    data: polls,
  });
})


export const PollController={
    createPoll,
    getPolls,
    updatePoll,
    updatePollReactions,
    updatePollComment,
    getPollByUserId
}
