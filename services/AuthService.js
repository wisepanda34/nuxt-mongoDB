// services/AuthService.js

import $api from '../http'
import {} from "axios";

const AuthService = {
  async login(email, password){
    return $fetch('/login', {email, password})
  },
  async registration(email, password){
    return $fetch('/registration', {email, password})
  },
  async logout(){
    return $fetch('/logout')
  }
}
export default AuthService