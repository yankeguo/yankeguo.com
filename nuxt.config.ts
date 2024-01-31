// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-particles"],
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
  ui: {
    icons: ["simple-icons", "heroicons", "bi", "noto-v1"],
  },
});
