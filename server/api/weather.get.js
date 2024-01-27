// server/api/weather.get.js

import TokenService from "../service/token-service";

export default defineEventHandler( async (event) => {

  try {
    const accessToken = getRequestHeader(event, 'Authorization');
    // const accessToken = authorization.split(' ')[1]
    console.log('accessToken:',accessToken);

    if (accessToken){
      const isAccessTokenValidated = TokenService.validateAccessToken(accessToken);
      
      if (!isAccessTokenValidated) {
        console.log('401');
        setResponseStatus(event, 401);
        return {
          message: 'accessToken is not valid'
        }
      }
  
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=50.9198&lon=-0.151891&appid=4fd94d0dd42303cf19a84a022c8d636e');
      console.log('weather.get.js return response');
      return response;
    }
  } catch (error) {
    console.log("Error weather.get:", error.message);
  }
})