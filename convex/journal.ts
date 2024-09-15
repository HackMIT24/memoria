import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {JournalEntry} from "../src/data/JournalEntry";


export const getAll = query({
	args: { },
	handler: async (ctx) => {
		const userObject = await ctx.auth.getUserIdentity();
		const userId = userObject?.tokenIdentifier;
		// Filter by user ID
		const dbJournals = await ctx.db.query("journal").filter(q => q.eq(q.field("user"), userId)).collect();
		return dbJournals.map(dbObject => new JournalEntry(
			dbObject._id,
			dbObject.user,
			dbObject.title,
			new Date(dbObject.date),
			dbObject.content
		))
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
	args: { title: v.string(), content: v.string(), date: v.string() },
	handler: async(ctx, { title, content, date }): Promise<string> => {
		const userId = await ctx.auth.getUserIdentity();
		const userId_ = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), userId?.tokenIdentifier)).first().then(user => user?._id);
		if(userId_ != undefined) return await ctx.db.insert("journal", { title, content, date, user: userId_ });
		else throw new Error("User was not found in database");
	}
})