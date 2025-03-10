// const pollSchema = new mongoose.Schema({
//     question: { type: String, required: true }, // Poll question
//     options: [
//       {
//         text: { type: String, required: true }, // Option text
//         votes: { type: Number, default: 0 }, // Number of votes
//       },
//     ],
//     expiresAt: { type: Date, required: true }, // Expiration timestamp
//     hideResults: { type: Boolean, default: false }, // Hide results until expiration
//     createdAt: { type: Date, default: Date.now }, // Poll creation time
//     reactions: {
//       fire: { type: Number, default: 0 }, // 🔥 Trending reaction count
//       like: { type: Number, default: 0 }, // 👍 Like reaction count
//     },
//     comments: [
//       {
//         text: { type: String, required: true }, // Comment text
//         createdAt: { type: Date, default: Date.now }, // Timestamp
//       },
//     ],
//   });
  
//   module.exports = mongoose.model("Poll", pollSchema);
  
export type TPoll ={
    question: string,
    slug: string,
    options: Array<{
        text: string,
        votes: number
    }>,
    expiresAt: Date,
    hideResults: boolean,
    createdAt: Date,
    reactions: {
        fire: number,
        like: number
    },
    comments: Array<{
        text: string,
        createdAt: Date
    }>
}