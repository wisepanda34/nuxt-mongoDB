// store/auth.js

import { defineStore } from 'pinia'
import AuthService from '~/services/AuthService.js'
import axios from 'axios'
import $api from '~/http'

export const useAuth = defineStore('authStore', {
  
  
  state: () => ({
    user: {},//email, id, role
    isAuth: false
  }),
  
  getters:{
    getIsAuth(state){
      return state.user?.role ? { role: state.user.role, isAuth: state.isAuth, email: state.user.email, userId: state.user.id} : null;
    },
  },
  
  actions: {
    login(user){
      this.isAuth = true
      this.user = user
    },
    async logout(){
      try {
        await $api.get("/api/logout")
        localStorage.removeItem("access_token");
      } catch(error){
        console.log("Error logging out:", error.message);
      } finally {
        this.isAuth = false
        this.user = {}
        navigateTo('/login')
      }
    },
  }
})
  //   async registration(email, password) {
  //     try{
  //       const response = await AuthService.registration(email, password)
  //       localStorage.setItem('token', response.data.accessToken)
  //       this.state.isAuth = true
  //       this.user = response.data.user
  //     }catch (e) {
  //       console.log('useAuth login error:', e)
  //       console.log('useAuth login error:', e.response?.data?.message)
  //     }
  //   },

  //   async logIn(email, password) {
  //     try{
  //       const response = await AuthService.login(email, password)
  //       localStorage.setItem('token', response.data.accessToken)
  //       this.state.isAuth = true
  //       this.user = response.data.user
  //     }catch (e) {
  //       console.log('useAuth login error:', e)
  //       console.log('useAuth login error:', e.response?.data?.message)
  //     }
  //   },
   
  //   async logOut() {
  //     try{
  //       const response = await AuthService.logout()
  //       localStorage.removeItem('token')
  //       this.state.isAuth = false
  //       this.user = {}
  
  //     }catch (e) {
  //       console.log('useAuth login error:', e)
  //       console.log('useAuth login error:', e.response?.data?.message)
  //     }
  //   },
  
  //   async checkAuth() {
  //     try{
  //       const response = await axios.get(`${process.env.API_URL}/refresh`, {withCredentials:true})
  //       localStorage.setItem('token', response.data.accessToken)
  //       this.state.isAuth = true
  //       this.user = response.data.user
  
  //     }catch (e) {
  //       console.log('useAuth login error:', e)
  //       console.log('useAuth login error:', e.response?.data?.message)
  //     }
  //   }