// server/api/utils/data-fetcher.js
import TokenService from "~/server/service/token-service.js";

export async function fetchData(model, event) {
  try {
    const accessToken = getRequestHeader(event, 'Authorization');
    let tokenId = null

    if (accessToken) {
      tokenId = TokenService.validateAccessToken(accessToken);

      if (!tokenId) {
        setResponseStatus(event, 401);
        return { message: 'accessToken is not valid'};
      }
    }

    const response = await model.find();

    if (response) {
      return response;
    } else {
      return { body: { message: "no data from DB" }};
    }
  } catch (error) {
    console.log(`data-fetcher.js error:`, error);
  }
}
