// delete-friend.js
import BirthdayModel from "~/server/models/Birthday.js";

export default defineEventHandler(async(event)=> {
    try {
        const userId = getRequestHeader(event, 'userId');
        if(!userId){
            return {body: {message: "no userId"}}
        }
        const query = getQuery(event)
        
        await BirthdayModel.updateOne(
            { user: userId },
            { $pull: { 'friends': { _id: query.id } } }
        );

        return {
            status: 200,
            body: { message: 'Друг успешно удален' },
        }
    } catch (error) {
        console.error('Ошибка при удалении друга:', error.message);

        return {
            status: 500,
            body: { error: 'Внутренняя ошибка сервера' },
        };
    }
});
