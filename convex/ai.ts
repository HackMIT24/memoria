import {v} from "convex/values";
import {mutation, query} from "./_generated/server"

const getMessages = async (messages: { role: string, content: string }[]) => {
    const data = await fetch("https://proxy.tune.app/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.TUNE_VERIFICATION ?? "Meow",
        },
        body: JSON.stringify({
            temperature: 0.8,
            messages: messages,
            model: "arnabcare21/Neurogenesis",
            stream: false,
            "frequency_penalty": 0,
            "max_tokens": 900
        })
    })

    const response = await data.json();
    return response.choices[0].message;
}

export const createConversation = mutation({
    args: { },
    handler: async (ctx) => {
           // Get user
           const userId = await ctx.auth.getUserIdentity().then(result => result?.tokenIdentifier);

           if(!userId) throw new Error("User not found");
           const user = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), userId)).first();

           if(!user) throw new Error("User not found");

           // Create the conversation
           return await ctx.db.insert("conversations", {
               user: user._id,
               messages: []
           });
    }
})

export const continueConversation = mutation({
    args: { conversationId: v.string(), nextMessage: v.string() },
    handler: async (ctx, args) => {
        // Get the current conversation
        const currentConversation = await ctx.db.query("conversations").filter(q => q.eq(q.field("_id"), args.conversationId)).first();
        const currentMessages = currentConversation?.messages ?? [];

        const newMessages = [...currentMessages, { role: "user", content: args.nextMessage}]

        // Make API request
        const result = await getMessages(newMessages);

        if(currentConversation?._id == null) throw new Error("Conversation not found");

        // Add it to messages and mutate array, then return it
        await ctx.db.patch(currentConversation?._id, { messages: [...newMessages, {role: "bot", content: result}]})

        return await ctx.db.get(currentConversation?._id) ?? { _id: "", messages: [] };
    }
})

export const getConversations = query({
    args: {},
    handler: async (ctx) => {
        const userId = await ctx.auth.getUserIdentity();

        const user = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), userId?.tokenIdentifier)).first();

        return await ctx.db.query("conversations").filter(q => q.eq(q.field("user"), user?._id)).collect();
    }
})