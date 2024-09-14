import type { UserIdentity } from 'convex/server'
import { query } from './_generated/server'

export default query(async (ctx) => {
	const user: UserIdentity | null = await ctx.auth.getUserIdentity()

	if (user === null) {
		return null
	}

	return user.tokenIdentifier
})