// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-07-10",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],

  app: {
    head: {
      link: [
        {
          key: "link-manifest",
          rel: "manifest",
          href: "/manifest-v2.json",
        },
        {
          key: "link-icon",
          rel: "icon",
          href: "/favicon-v2.ico",
        },
      ],
    },
  },

  runtimeConfig: {
    lastwillGitHubToken: process.env.LASTWILL_GITHUB_TOKEN,
    lastwillToken: process.env.LASTWILL_TOKEN,
    solanaEndpoint: process.env.SOLANA_ENDPOINT,
  },

});
