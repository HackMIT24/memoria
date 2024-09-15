import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveUserAnswers = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const secrets = {
      fullName: args.fullName,
      age: args.age,
      memoryIssuesDuration: args.memoryIssuesDuration,
      diagnosis: args.diagnosis,
      livingSituation: args.livingSituation,
      caregiver: args.caregiver,
      emergencyContacts: args.emergencyContacts,
      dailyRoutine: args.dailyRoutine,
      dietaryRestrictions: args.dietaryRestrictions,
      importantDatesReminder: args.importantDatesReminder,
      alertOnWandering: args.alertOnWandering,
      calmingMethods: args.calmingMethods,
    }

    // Get user
    const userId = await ctx.auth.getUserIdentity().then(result => result?.tokenIdentifier);
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), userId)).first();

    if(!user) throw new Error("User not found");

    await ctx.db.patch(user._id, { secrets: secrets },);

    return { success: true };
  },
});