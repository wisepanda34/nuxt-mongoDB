// server/api/getAllUsers.js

import UserModel from "~/server/models/Users.js";
import authMiddleware from "~/server/middleawares/auth-middleware.js";

export default defineEventHandler(async(ctx) => {
  try{
    await  authMiddleware(ctx)
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