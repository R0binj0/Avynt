import { query } from "./_generated/server";
import { v } from "convex/values";

export const getActive = query({
    handler: async (ctx) => {
        const quizzes = await ctx.db.query("quiz").collect();

        const activeQuiz = quizzes.find((quiz) => quiz.active);

        return activeQuiz;
    },
});

export const get = query({
    args: { id: v.id("quiz") },
    handler: async (ctx, args) => {
        const quiz = await ctx.db.get(args.id);

        return quiz;
    }
});

