// server/middlewares/auth-midlleware.js

import tokenService from "~/server/service/token-service.js";

export default async function (ctx) {
  try{
    const authorizationHeader = ctx.req.headers.authorization
    if(!authorizationHeader) {
      return {
        status: 401,
        body: {message: "User is not authorizated!"}
      }
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if(!accessToken) {
      return {
        status: 401,
        body: {message: "User is not authorizated!"}
      }
    }

    const userData = tokenService.validateAccessToken(accessToken)
    if(!userData){
      return {
        status: 401,
        body: {message: "User is not authorizated!"}
      }
    }

    ctx.req.user = userData;
    // next()

  } catch (error) {
    console.error('Error login.js:', error.message);
    console.error('Stack Trace:', error.stack);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
}