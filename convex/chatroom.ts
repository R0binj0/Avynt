import { v } from "convex/values"
import { query } from "./_generated/server"
import { mutation } from "./_generated/server"

export const create = mutation({
    args : {
        id: v.id("boards"),
        roomName: v.string(),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error("Board not found")
        }

        const chat = await ctx.db.insert("chatRooms", {
            boardId : board._id,
            roomName : args.roomName,
            createdBy : identity.name!,
        });

        return chat
    }
})

export const remove = mutation({   
    args : {
        id: v.id("chatRooms")
    },
        
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        //TODO: Delete all massages from Chat

        await ctx.db.delete(args.id)
    }

    
})

export const update = mutation({   
    args : {
        id: v.id("chatRooms"),
        roomName: v.string()
    },
        
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const roomName = args.roomName.trim()

         if (!roomName) {
            throw new Error("Room name is required")
        }

        if (roomName.length > 30) {
            throw new Error("Room name cannot be longer than 30 characters")
        }

        const chat = await ctx.db.patch(args.id, {
            roomName: args.roomName
        })

        return chat
    }
})

export const get = query({   
    args : {
        boardId: v.id("boards"),
    },
        
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const chats = await ctx.db
            .query("chatRooms")
            .withIndex("by_board", (q) =>
                q.eq("boardId", args.boardId)
            )
            .collect();
        
        return chats
    }
})

export const send = mutation({
    args : {

    },
    
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }
    }
})

export const messages = mutation({
    args : {

    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }
    }
})

