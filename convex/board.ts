import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

const images = [
    "/board-images/1.png",
    "/board-images/2.png",
    "/board-images/3.png",
    "/board-images/4.png",
    "/board-images/5.png",
    "/board-images/6.png",
    "/board-images/7.png",
    "/board-images/8.png",
    "/board-images/9.png",
    "/board-images/10.png",
    "/board-images/11.png",
    "/board-images/12.png",
    "/board-images/13.png",
    "/board-images/14.png",
    "/board-images/15.png",
    "/board-images/16.png",
    "/board-images/17.png",
    "/board-images/18.png",
    "/board-images/19.png",
    "/board-images/20.png",
]

export const create = mutation({
    args: { 
        orgId: v.string(), 
        title: v.string(), 
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]
        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        })
        
        return board;
    }
})

export const remove = mutation({
    args: { 
        id: v.id("boards")
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", args.id)
            )
            .unique()

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id)
        }

        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args: { 
        id: v.id("boards"),
        title: v.string()
    },

    handler: async ( ctx, args ) => {

        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const title = args.title.trim()

        if (!title) {
            throw new Error("Tilte is required")
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters")
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title
        })

        return board
    }
})

export const favorite = mutation({
    args: {
        id: v.id("boards"), 
        orgId: v.string()
    },

    handler: async ( ctx, args ) => {

        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error("Board not found")
        }

        const userId = identity.subject

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
            q
                .eq("userId", userId)
                .eq("boardId", board._id)
            )
            .unique()

        if (existingFavorite) {
            throw new Error("Board already favorited")
        }

        await ctx.db.insert("userFavorites", {
            userId,
            boardId: board._id,
            orgId: args.orgId,
        })

        return board
    }
}) 

export const unfavorite = mutation({
    args: {
        id: v.id("boards")
    },
    
    handler: async ( ctx, args ) => {

        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error("Board not found")
        }

        const userId = identity.subject

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
            q
                .eq("userId", userId)
                .eq("boardId", board._id)
            )
            .unique()

        if (!existingFavorite) {
            throw new Error("Favorited board not found")
        }

        await ctx.db.delete(existingFavorite._id)

        return board
    }
})

export const get = query({
    args: { id: v.id("boards")},
    handler: async (ctx, args) => {
        const board = ctx.db.get(args.id)

        return board
    }
})