// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],

  app: {
    head: {
      link: [
        {
          key: "link-manifest",
          rel: "manifest",
          href: "/manifest-v1.json",
        },
        {
          key: "link-icon",
          rel: "icon",
          href: "/favicon-v1.ico",
        },
      ],
    },
  },

  runtimeConfig: {
    lastwillGitHubToken: process.env.LASTWILL_GITHUB_TOKEN,
    lastwillToken: process.env.LASTWILL_TOKEN,
  },

  ui: {
    icons: ["simple-icons", "heroicons", "bi", "noto-v1"],
  },

  experimental: {
    appManifest: false,
  },

  compatibilityDate: "2024-07-10",
});
