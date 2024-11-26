// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  ssr: false,
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
    supabase: {
      supabaseSecret: process.env.SUPABASE_SERVICE_KEY,
    },
    spotify: {
      apiBase: process.env.SPOTIFY_API_BASE,
      accountBase: process.env.SPOTIFY_ACCOUNT_API_BASE,
      accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
      refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
      authToken: process.env.SPOTIFY_AUTH_TOKEN,
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@nuxt/image",
  ],
});