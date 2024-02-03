// server/api/birthdays.get.js
import BirthdayModel from "@/server/models/Birthday.js";
import TokenService from "~/server/service/token-service.js";
// import { fetchData } from "@/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {
  try {
    const accessToken = getRequestHeader(event, 'Authorization');
    
    let tokenId = null

    if (accessToken) {
      tokenId = await TokenService.validateAccessToken(accessToken);

      if (!tokenId) {
        setResponseStatus(event, 401);
        return { message: 'accessToken is not valid'};
      }
    }
    

    if(tokenId){
      const response = await BirthdayModel.findOne({ user: tokenId }, {'friends': 1});
      
      if (response) {
        
        return response.friends;
      } else {
        return { body: { message: "no data from DB" }};
      }
      
    } else {
      return { body: { message: "no userId from request" }};
    }
  } catch (error) {
    console.log(`birthdays.get.js error:`, error);
  }
});
