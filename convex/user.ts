import type {UserIdentity} from 'convex/server'
import {mutation, query} from './_generated/server'

export const getCurrentUser = query(async (ctx): Promise<UserIdentity | null> => {
	const user: UserIdentity | null = await ctx.auth.getUserIdentity()
	if (user === null) {
		return null
	}
	return user
})

export const createUserIfNotExists = mutation({
	args: {},
	handler: async (ctx) => {
		// See if user exists; if so, do nothing. otherwise, create the user and add it to the database
		const user = await ctx.auth.getUserIdentity()
		if (user === null) {
			throw new Error("User not found")
		}
		const tokenIdentifier = user.tokenIdentifier
		const existingUser = await ctx.db.query('users').filter(g => g.eq(g.field("tokenIdentifier"), tokenIdentifier)).first()
		if (existingUser !== null) {
			return
		}
		await ctx.db.insert('users', {
            name: user?.name ?? "User", tokenIdentifier, memories: [], secrets: []
        })

	}
})