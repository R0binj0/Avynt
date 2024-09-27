import { v } from "convex/values"
import { defineSchema, defineTable } from "convex/server"

export default defineSchema({
    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string()
    })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
        searchField: "title",
        filterFields: ["orgId"]
    }),

    userFavorites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        boardId: v.id("boards"),
    })
    .index("by_board", ["boardId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_board", ["userId", "boardId"])
    .index("by_user_board_org", ["userId", "boardId", "orgId"]),

    chatRooms: defineTable({
        boardId: v.id("boards"),
        roomName: v.string(), 
        createdBy: v.string(),
    })
    .index("by_board", ["boardId"]),

    chatMessages: defineTable({
        roomId: v.id("chatRooms"),
        senderId: v.string(),
        senderName: v.string(),
        message: v.string(),
        timestamp: v.number(),
    })
    .index("by_room", ["roomId"]),

    feedback: defineTable({
        userId: v.string(),
        quizId: v.id("quiz"),
        responses: v.record(v.string(), v.string()),
    })
    .index("by_user_quiz", ["userId", "quizId"]),

    quiz: defineTable({
        title: v.string(),
        active: v.boolean(),
    }),

    questions: defineTable({
        quizId: v.id("quiz"),
        questionText: v.string(),
        questionType: v.string(),
    })
    .index("by_quiz", ["quizId"]),

})