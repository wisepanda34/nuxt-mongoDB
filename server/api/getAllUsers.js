// server/api/getAllUsers.js

import UserModel from "~/server/models/Users.js";

export default defineEventHandler(async() => {
  try{
    return  await UserModel.find()

  }catch (error) {
    console.error('Error login.js:', error.message);
    console.error('Stack Trace:', error.stack);

    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
})