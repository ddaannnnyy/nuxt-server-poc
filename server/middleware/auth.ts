import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // don't handle non api route requests
  if (!event.node.req.url?.startsWith("/api")) return;
  try {
    const user = await serverSupabaseUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
});
