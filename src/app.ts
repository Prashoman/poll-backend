import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { PollRoutes } from "./app/modules/poll/poll.route";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000","https://poll-app-bice.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Start with /api");
});

app.use("/api", PollRoutes);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
