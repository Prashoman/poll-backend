"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const poll_route_1 = require("./app/modules/poll/poll.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://poll-app-bice.vercel.app"],
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Start with /api");
});
app.use("/api", poll_route_1.PollRoutes);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
