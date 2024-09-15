import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.string(),
		tokenIdentifier: v.string(),
		memories: v.array(
			v.object({
				url: v.string(),
				label: v.string()
			})
		),
		secrets: v.array(
			v.object({
				prompt: v.string(),
				answer: v.string(),
			})
		),
	}).index("by_token", ["tokenIdentifier"]),
	journal: defineTable({
		title: v.string(),
		content: v.string(),
		date: v.string(),
		user: v.id("users"),
	}),
	conversations: defineTable({
		user: v.id("users"),
		messages: v.array(
			v.object({
				role: v.string(),
				content: v.string()
			})
		)
	})
})