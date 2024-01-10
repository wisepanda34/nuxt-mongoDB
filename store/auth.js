// store/auth.js

import { defineStore } from 'pinia'
import AuthService from '~/services/AuthService.js'

export const useAuthStore = defineStore('authStore', {
  state: {
    user: {},
    isAuth: false
  },
  async login(email, password) {
    try{
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.state.isAuth = true
      this.user = response.data.user
    }catch (e) {
      console.log('useAuth login error:', e)
      console.log('useAuth login error:', e.response?.data?.message)
    }
  },
  async registration(email, password) {
    try{
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.state.isAuth = true
      this.user = response.data.user
    }catch (e) {
      console.log('useAuth login error:', e)
      console.log('useAuth login error:', e.response?.data?.message)
    }
  },
  async logout() {
    try{
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      this.state.isAuth = false
      this.user = {}

    }catch (e) {
      console.log('useAuth login error:', e)
      console.log('useAuth login error:', e.response?.data?.message)
    }
  },

  async checkAuth() {
    try{
      const response = await fetch('/refresh')
      localStorage.setItem('token', response.data.accessToken)
      this.state.isAuth = true
      this.user = response.data.user

    }catch (e) {
      console.log('useAuth login error:', e)
      console.log('useAuth login error:', e.response?.data?.message)
    }
  }

})