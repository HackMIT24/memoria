import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		const userObject = await ctx.auth.getUserIdentity();
		const userId = userObject?.tokenIdentifier;

		const user = await ctx.db.query('users').filter(g => g.eq(g.field("tokenIdentifier"), userId)).first()
		return user?.memories
	}
})

export const addMemory = mutation({
	args: {
		url: v.string(),
		label: v.string(),
	},
	handler: async (ctx, args) => {
		const userIdentity = await ctx.auth.getUserIdentity();
		const user = await ctx.db.query('users').filter(g => g.eq(g.field("tokenIdentifier"), userIdentity?.tokenIdentifier)).first()

		const userId = user?._id;

		if (!userId) return false;

		// Create the new memory object
		const newMemory = {url: args.url, label: args.label};

		// Update the user document with the new memory
		await ctx.db.patch(userId, {
			memories: [...(user?.memories || []), newMemory],
		});

		return {success: true};
	},
});