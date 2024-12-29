import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.string(),
    isOnboarded: v.boolean(),
    name: v.optional(v.string()),
    nameSlug: v.optional(v.string()),
  }).index("by_email", ["email"]),
});
