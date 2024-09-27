import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: { quizId: v.id("quiz") },
    handler: async (ctx, args) => {
        const questions = await ctx.db
            .query("questions")
            .withIndex("by_quiz", (q) => q.eq("quizId", args.quizId))
            .collect();

        return questions;
    }
});
