import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {JournalEntry} from "../src/data/JournalEntry";


export const getAll = query({
	args: { userId: v.string() },
	handler: async (ctx, { userId }) => {
		// Filter by user ID
		return await ctx.db.query("journal").filter(q => q.eq(q.field("user"), userId)).collect();
	},
});

export const getSingle = query({
	args: { input: v.object({ userId: v.string(), id: v.string() }) },
	handler: async (ctx, { input }): Promise<JournalEntry[]> => {
		// Filter by user ID and journal ID
		const rawData = await ctx.db.query("journal").filter(q => q.eq(q.field("user"), input.userId))
												  .filter(q => q.eq(q.field("_id"), input.id))
												  .collect()
		return rawData.map(element => new JournalEntry(
			element._id,
			element.user,
			element.title,
			new Date(element.date),
			element.content
		));
	},
});

export const createEntry = mutation({
	args: { title: v.string(), content: v.string(), date: v.string(), userId: v.string() },
	handler: async(ctx, { title, content, date }) => {
		const user = ctx.db.query("users").first( )
	}
})