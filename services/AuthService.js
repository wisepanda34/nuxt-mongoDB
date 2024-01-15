// services/AuthService.js

import $api from '../http'
import {} from "axios";

const AuthService = {
  async login(email, password){
    return $fetch('api/login', {email, password})
  },
  async registration(email, password){
    return $fetch('api/registration', {email, password})
  },
  async logout(){
    return $fetch('api/logout')
  }
}
export default AuthService