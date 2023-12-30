// Token.js
import {Schema,model} from "mongoose";

const TokenSchema = new Schema({
  user: {
    //означает, что ожидается идентификатор объекта (ObjectId) MongoDB.
    // Это создает связь между токеном и пользователем.
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  refreshToken: {
    type: String,
    required: true
  }
})
const tokenModel = model('tokens', TokenSchema)
export default tokenModel




