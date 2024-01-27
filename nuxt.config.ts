// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr : false , 
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Congratulate",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/check-mark.ico" }]
    }
  },
  devtools: { enabled: true },
  runtimeConfig: {
    dbUrl: process.env.DATABASE_URL,
  },
  modules: ['@pinia/nuxt', "@nuxt/image", '@morev/vue-transitions/nuxt'],
  
  css: [
    '~/assets/scss/_reset.scss',
    '~/assets/scss/_text.scss',
    '~/assets/scss/_variables.scss',
    '~/assets/scss/_transition.scss',
    '~/assets/scss/_general.scss'
  ],
})