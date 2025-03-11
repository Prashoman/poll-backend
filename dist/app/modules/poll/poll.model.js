"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = void 0;
const mongoose_1 = require("mongoose");
const pollSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    slug: { type: String },
    options: [
        {
            text: { type: String, required: true },
            votes: { type: Number, default: 0 },
        },
    ],
    expiresAt: { type: Date, required: true },
    hideResults: { type: Boolean, default: false },
    reactions: {
        fire: { type: Number, default: 0 },
        like: { type: Number, default: 0 },
    },
    comments: [
        {
            text: { type: String, default: "" },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    totalVotes: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    expired: { type: Boolean, default: false },
    userId: { type: String, default: "" },
    pollType: { type: String, default: "public" },
}, {
    timestamps: true,
});
exports.Poll = (0, mongoose_1.model)("Poll", pollSchema);
