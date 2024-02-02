// Birthday.js

import { Schema, model } from "mongoose";
// Defining Schema
const BirthdaySchema = new Schema({
  user: {
    //означает, что ожидается идентификатор объекта (ObjectId) MongoDB.
    // Это создает связь между токеном и пользователем.
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  friends: [
    {
      friend: {
        name: {
          type: String,
          required: true,
          trim: true
        },
        surname: {
          type: String,
          trim: true
        },
        birthday: {
          day: Number,
          indexMonth: Number,
          year: Number,
        },
        info: {
          type: String,
          trim: true
        },
        beforehand: {
          type: String
        }
      }
    }
  ]
  
  
})
//Compiling Schema
const BirthdayModel = model('usersfriends', BirthdaySchema)
export default BirthdayModel