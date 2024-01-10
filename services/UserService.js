// services/UserService.js

import $api from '../http'
import {AxiosResponse} from "axios";

const UserService = {
  async fetchUser(){
    return $api.get('/users')
  },
}
export default UserService