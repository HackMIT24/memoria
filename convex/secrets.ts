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
    await ctx.db.insert("users", {
        name: args.fullName, 
    });
    return { success: true };
  },
});