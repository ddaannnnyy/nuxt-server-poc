export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser().value;
});
