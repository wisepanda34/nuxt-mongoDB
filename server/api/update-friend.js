// update-friend.js
import BirthdayModel from "~/server/models/Birthday.js";
import TokenService from "~/server/service/token-service.js";

export default defineEventHandler(async(event)=> {

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

    const body = await readBody(event);
    const { friendId, name, surname, info, birthday, beforehand } = body; 

    if (!tokenId) {
      throw new Error('No ID provided');
    }
    await BirthdayModel.updateOne(
      { user: tokenId, 'friends._id': friendId },
      {
        $set: {
          'friends.$.friend.name': name,
          'friends.$.friend.surname': surname,
          'friends.$.friend.birthday': birthday,
          'friends.$.friend.info': info,
          'friends.$.friend.beforehand': beforehand
        },
      }
    );

    return {
      status: 200,
      body: { message: 'Friend data was updated' },
    };
  } catch (error){
    console.error('Internal Server Error update-friend.js:', error.status);

    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
})
