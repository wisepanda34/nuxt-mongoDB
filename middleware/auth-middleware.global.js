//  middleware/auth-middleware.global.js

import { useAuth } from '~/store/auth'

const privateRoutes = [
  '/profile',
  '/friends',
  '/authors',
  '/books',
  '/weather'
]
const adminRoutes = [
  '/admin',
]

export default defineNuxtRouteMiddleware((to) => {
  console.log("auth-middleware start!");
  const authStore = useAuth()

  const isPrivateRoute = privateRoutes.some(privateRoute => to.path.includes(privateRoute))
  const isUserAuthed = authStore.getIsAuth
 
  if (isPrivateRoute && !isUserAuthed) {
    return navigateTo('/login')
  }
  
})