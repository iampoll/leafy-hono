import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new ConvexError({
        message: "User not found",
        statusCode: 404,
      });
    }

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      isOnboarded: user.isOnboarded,
      nameSlug: user.nameSlug,
    };

    return userResponse;
  },
});
