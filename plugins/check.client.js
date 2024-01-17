// plugins/check.client.js

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    console.log('check.client');
    if (process.client){
      const accessToken = localStorage.getItem('access_token')
      if(!accessToken){
        navigateTo('/')
      }
    }
  })
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('vue:error')
    // if (process.client) {
    //   console.log(..._args)
    // }
  })
})

