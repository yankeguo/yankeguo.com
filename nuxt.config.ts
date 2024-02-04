// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-particles",
    'nuxt-bugsnag',
  ],
  bugsnag: {
    publishRelease: true,
    disableLog: true,
    baseUrl: 'https://yankeguo.com',
    config: {
      apiKey: '1f733b5920aae544351070dcdd471dfa'
    }
  },
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
  experimental: {
    appManifest: false
  }
});
