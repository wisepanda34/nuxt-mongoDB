// token-service.js
import jwt from 'jsonwebtoken'
import tokenModel  from '../models/Token.js'

const TokenService = {

  generateTokens (payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '180m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  },

  validateAccessToken(token) {
    try{
      return  jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    }catch (error) {
      console.log(error)
      return null
    }
  },

  validateRefreshToken(token) {
    try{
      return  jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    }catch (error) {
      console.log(error)
      return null
    }
  },

  async saveToken (userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId})
    if(tokenData){
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModel.create({user: userId, refreshToken})
    return token
  },

  async removeToken (refreshtoken) {
    const tokenData = await tokenModel.deleteOne({refreshtoken})
    return tokenData
  },

  async findToken (refreshtoken) {
    const tokenData = await tokenModel.findOne({refreshtoken})
    return tokenData
  }
}

export default TokenService