//  middleware/auth-middleware.global.js

import { useAuth } from '~/store/auth'

const isPrivateRoutes = [
  '/profile',
  '/friends',
  '/authors',
  '/books',
  '/weather'
]

export default defineNuxtRouteMiddleware((to) => {
  // console.log("auth-middleware start!");
  // const app = useNuxtApp()
  const authStore = useAuth()

  const isPrivateRoute = isPrivateRoutes.some(privetRoute => to.path.includes(privetRoute))
  const isUserAuthed = authStore.getIsAuth
  if (isPrivateRoute && !isUserAuthed) {
    return navigateTo('/')
  }
})