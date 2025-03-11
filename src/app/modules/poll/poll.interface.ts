
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
    totalVotes: number,
    totalLikes: number
}