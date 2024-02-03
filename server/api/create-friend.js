// server/api/create-friend.js
import BirthdayModel from "~/server/models/Birthday.js";
import TokenService from "~/server/service/token-service.js";


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
        
        const { name, surname, birthday, info, beforehand } = await readBody(event);
        
        const existingFriend = await BirthdayModel.findOne({ user: tokenId });

        if (existingFriend){
            existingFriend.friends.push({
                friend: {
                    name,
                    surname,
                    birthday,
                    info,
                    beforehand
                }
            });  

            try {
                await existingFriend.save();
                return { body: { message: 'Friend data received successfully' }};
            } catch (error) {
                console.error('Error during saving:', error.message);
                return { body: { error: 'Error saving friend data' }};
            }
        } else {
            const newFriend = new BirthdayModel({
                user: tokenId,
                friends: [
                    {
                        friend: {
                            name,
                            surname,
                            birthday,
                            info,
                            beforehand
                        }
                    }
                ]
            });
            try {
                await newFriend.save();
                return { body: { message: 'Added new friend in DB' }};
            } catch(error) {
                console.error('Error during saving:', error.message);
                return { body: { error: 'Error saving friend data' }};
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack Trace:', error.stack);
        return { body: { error: 'Internal Server Error' },};
    }
});


