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



export const PollController={
    createPoll
}
