// server/api/getAllUsers.js

import UserModel from "~/server/models/Users.js";
import TokenService from "~/server/service/token-service.js";

export default defineEventHandler(async(event) => {
  try{
    const accessToken = getRequestHeader(event, 'Authorization');
    let tokenId = null

    if (accessToken) {
      tokenId = await TokenService.validateAccessToken(accessToken);

      if (!tokenId) {
        setResponseStatus(event, 401);
        return { message: 'accessToken is not valid'};
      }
    } else {
      return { body: { message: "no accessToken from request" }};
    }

    const response = await UserModel.find()
    if (response) {
      return response;
    } else {
      return { body: { message: "no data from DB" }};
    }

  }catch (error) {
    console.error('Error getAllUsers.js:', error);

    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
})