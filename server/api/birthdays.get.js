// server/api/birthdays.get.js
import birthdayModel from "@/server/models/Birthday.js";
import TokenService from "../service/token-service";

export default defineEventHandler(async (event) => {
  try {
    const accessToken = getRequestHeader(event, 'Authorization');
    // console.log('accessToken:',accessToken);
    
    if (accessToken) {
      const accessTokenValidated = TokenService.validateAccessToken(accessToken);
      if (!accessTokenValidated) {
        // console.log('birthdays.get: 401');
        setResponseStatus(event, 401)
        return
      }   
      const response = await birthdayModel.find();
      // console.log('birthdays.get response: ', response);
      
      return response;
    }
    setResponseStatus(event, 401)

  } catch (error) {
    console.error('Error in birthdays.get.js',error);
  }
});
