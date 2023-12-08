// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    dbUrl: process.env.DATABASE_URL,
  },
  modules: ['@pinia/nuxt', "@nuxt/image", '@morev/vue-transitions/nuxt'],
  css: [
    '~/assets/scss/_reset.scss',
    '~/assets/scss/_general.scss',
    '~/assets/scss/_transition.scss',
  ]
})