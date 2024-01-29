// store/auth.js

import { defineStore } from 'pinia'
import AuthService from '~/services/AuthService.js'
import axios from 'axios'



export const useAuth = defineStore('authStore', {
  state: () => ({
    user: {},//email, id, role
    isAuth: false
  }),
  
  getters:{
    getIsAuth(state){
      return state.isAuth
    },
  },
  
  actions: {
    login(user){
      this.isAuth = true
      this.user = user
    },
    logout(){
      this.isAuth = false
      this.user = {}
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

    async logIn(email, password) {
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
   
    async logOut() {
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
        const response = await axios.get(`${process.env.API_URL}/refresh`, {withCredentials:true})
        localStorage.setItem('token', response.data.accessToken)
        this.state.isAuth = true
        this.user = response.data.user
  
      }catch (e) {
        console.log('useAuth login error:', e)
        console.log('useAuth login error:', e.response?.data?.message)
      }
    }
  }
  

})