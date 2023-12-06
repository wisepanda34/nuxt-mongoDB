// delete-friend.js
import BirthdayModel from "~/server/models/Birthday.js";

export default defineEventHandler(async(event)=> {
    try {
        console.log(event.body.id)
        const id = event.body.id; // Access the "id" property from the body
        console.log("ID:", id);
        if (!id) {
            throw new Error('No ID provided');
        }
        await BirthdayModel.deleteOne({ _id: id });
        return {
            status: 200,
            body: { message: 'Друг успешно удален' },
        };
    } catch (error) {
        console.error('Ошибка при удалении друга:', error.message);

        return {
            status: 500,
            body: { error: 'Внутренняя ошибка сервера' },
        };
    }
})
