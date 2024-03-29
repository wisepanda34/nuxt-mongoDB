// token-service.js
import jwt from 'jsonwebtoken'
import tokenModel  from '../models/Token.js'

const TokenService = {

  generateTokens (payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  },

  validateAccessToken(token) {
    try{
      let decodated = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return decodated.id
    }catch (error) {
      console.log('validateAccessToken() invalid')
      return null
    }
  },

  validateRefreshToken(refreshToken) {
    try{
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    }catch (error) {
      console.log('validateRefreshToken() invalid')
      return false
    }
  },

  async findToken (refreshToken) {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData
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

  async removeToken (refreshToken) {
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData
  },
}

export default TokenService