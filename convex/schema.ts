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
		secrets: v.optional(
			v.object({
				fullName: v.string(),
				age: v.string(),
				memoryIssuesDuration: v.string(),
				diagnosis: v.string(),
				livingSituation: v.string(),
				caregiver: v.string(),
				emergencyContacts: v.string(),
				dailyRoutine: v.string(),
				dietaryRestrictions: v.string(),
				importantDatesReminder: v.string(),
				alertOnWandering: v.string(),
				calmingMethods: v.string(),
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