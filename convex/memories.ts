import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

    export const getAll = query({
        args: { },
        handler: async (ctx) => {
            const userObject = await ctx.auth.getUserIdentity();
		    const userId = userObject?.tokenIdentifier;

            const user = await ctx.db.query('users').filter(g => g.eq(g.field("tokenIdentifier"), userId)).first()
            return user?.memories
        }
})

export const addMemory = mutation({
    args: {
      userId: v.id("users"),
      url: v.string(),
      label: v.string(),
    },
    handler: async (ctx, args) => {
      const { userId, url, label } = args;
  
      // Fetch the current user document
      const user = await ctx.db.get(userId);
      if (!user) {
        throw new Error("User not found");
      }
  
      // Create the new memory object
      const newMemory = { url, label };
  
      // Update the user document with the new memory
      await ctx.db.patch(userId, {
        memories: [...(user.memories || []), newMemory],
      });
  
      return { success: true };
    },
});