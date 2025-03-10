import mongoose from "mongoose";
import app from "./app";

import { Server } from "http";
import httpStatus from "http-status";
import AppError from "./app/errors/AppError";
import config from "./config";

let server:Server;
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
   server= app.listen(config.port, () => {
      console.log(`Poll Server is Running: ${config.port}`);
    });
  } catch (err : any) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
}
main();

process.on('unhandledRejection', (err) => {
  console.log(`unaHandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`unCaughtException is detected , shutting down ...`);
  process.exit(1);
});


