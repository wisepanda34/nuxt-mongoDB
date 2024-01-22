// server/api/weather.get.js

import TokenService from "../service/token-service";

export default defineEventHandler( async (event) => {

  // try {
    // const accessToken = getRequestHeader(event, 'Authorization');
    // console.log('accessToken:',accessToken);

    // if (accessToken){
    //   const accessTokenValidated = TokenService.validateAccessToken(accessToken);
      
    //   if (!accessTokenValidated) {
    //     // console.log('statusCode: 403');
    //     return{error:403}
    //     // setResponseStatus(event, 401)
    //   }
  
    //   const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=50.9198&lon=-0.151891&appid=4fd94d0dd42303cf19a84a022c8d636e');
    //   // console.log('weather.get response: ', response.ok);
    //   return response;
    // }
    // // setResponseStatus(event, 401)
    // return{error:403}
  try{
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=50.9198&lon=-0.151891&appid=4fd94d0dd42303cf19a84a022c8d636e');
    // console.log('weather.get response: ', response.ok);
    return response;

  } catch (error) {
    console.log("Error weather.get:", error.message);
  }
})