import {mutation, query} from "./_generated/server";
import {v} from "convex/values";


export const getAll = query({
	args: {},
	handler: async (ctx) => {
		const userIdentity = await ctx.auth.getUserIdentity();
		const userId = userIdentity?.tokenIdentifier ?? null;
		const user = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), userId)).first();

		// Filter by user ID
		return await ctx.db.query("journal").filter(q => q.eq(q.field("user"), user?._id ?? "meow")).collect();
	},
});

export const getSingle = query({
	args: {input: v.object({id: v.string()})},
	handler: async (ctx, {input}) => {
		// Filter by user ID and journal ID
		const userIdentity = await ctx.auth.getUserIdentity();
		const user = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), userIdentity?.tokenIdentifier)).first();
		return await ctx.db.query("journal").filter(q => q.eq(q.field("user"), user?._id))
			.filter(q => q.eq(q.field("_id"), input.id)).first();
	}
});

export const createEntry = mutation({
	args: {title: v.string(), content: v.string(), date: v.string()},
	handler: async (ctx, {title, content, date}): Promise<string> => {
		const userId = await ctx.auth.getUserIdentity();
		const userId_ = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), userId?.tokenIdentifier)).first().then(user => user?._id);
		if (userId_ != undefined) return await ctx.db.insert("journal", {title, content, date, user: userId_});
		else throw new Error("User was not found in database");
	}
})