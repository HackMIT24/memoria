import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.string(),
		tokenIdentifier: v.string(),
	}).index("by_token", ["tokenIdentifier"]),
	journal: defineTable({
		title: v.string(),
		content: v.string(),
		date: v.string(),
		user: v.id("users"),
	})
})