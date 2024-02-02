// server/api/create-friend.js
import BirthdayModel from "~/server/models/Birthday.js";

export default defineEventHandler(async (event) => {
    try {
        const userId = getRequestHeader(event, 'userId');
        if(!userId){
            return {body: {message: "no userId"}}
        }
        
        const { name, surname, birthday, info, beforehand } = await readBody(event);
        const existingFriend = await BirthdayModel.findOne({ user: userId });
        

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
            } catch (saveError) {
                console.error('Error during saving:', saveError.message);
                return { body: { error: 'Error saving friend data' }};
            }
        } else {
            const newFriend = new BirthdayModel({
                user: userId,
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


