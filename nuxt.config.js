// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Nuxt 3 Portfolio",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  modules: ["@pinia/nuxt"],
  buildModules: [
    // ...
    "@nuxtjs/tailwindcss",
  ],
  css: ["@/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
