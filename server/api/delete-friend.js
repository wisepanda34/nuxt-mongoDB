// delete-friend.js
import BirthdayModel from "~/server/models/Birthday.js"
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
        const query = getQuery(event)
        
        await BirthdayModel.updateOne(
            { user: tokenId },
            { $pull: { 'friends': { _id: query.id } } }
        );

        return {
            status: 200,
            body: { message: 'Friend was deleted' },
        }
    } catch (error) {
        console.error('Server delete-friend.js error:', error.message);

        return {
            status: 500,
            body: { error: 'Server delete-friend.js error' },
        };
    }
});
