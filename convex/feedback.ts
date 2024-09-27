import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const create = mutation({
    args: { quizId: v.id("quiz"), responses: v.record(v.string(), v.string()) },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const userId = identity.subject;

        const feedback = await ctx.db.insert("feedback", {
            userId: userId,
            quizId: args.quizId,
            responses: args.responses
        })

        return feedback;
    }
})

export const get = query({
    args: { quizId: v.id("quiz") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const userId = identity.subject

        const feedback = await ctx.db
            .query("feedback")
            .withIndex("by_user_quiz", (q) =>
                q
                    .eq("userId", userId)
                    .eq("quizId", args.quizId)
            )
            .unique()

        return feedback ? true : false;
    },

});