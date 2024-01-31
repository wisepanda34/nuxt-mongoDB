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
  const authStore = useAuth()

  const isPrivateRoute = privateRoutes.some(privateRoute => to.path.includes(privateRoute))
  const isAdminRoute = adminRoutes.some(adminRoute => to.path.includes(adminRoute))
  const isUserAuthed = authStore.getIsAuth

  if (isPrivateRoute && !isUserAuthed) {
    return navigateTo('/login')
  }
  if (!isAdminRoute && isUserAuthed?.role === 'admin') {
    return navigateTo('/admin')
  }
  if (isAdminRoute && isUserAuthed?.role !== 'admin') {
    return navigateTo('/')
  }

})