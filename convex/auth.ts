import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const register = mutation({
  args: {
    email: v.string(),
    hashedPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, hashedPassword } = args;

    const userAlreadyExists = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (userAlreadyExists) {
      throw new ConvexError({
        message: "User already exists",
        statusCode: 409,
      });
    }

    const userId = await ctx.db.insert("users", {
      email,
      password: hashedPassword,
      isOnboarded: false,
    });

    return { userId };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const { email } = args;

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (!user) {
      throw new ConvexError({
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    return { user };
  },
});
