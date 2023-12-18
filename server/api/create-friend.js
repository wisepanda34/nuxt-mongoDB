import BirthdayModel from "~/server/models/Birthday.js";

export default defineEventHandler(async (event) => {
    try {
        const { name, surname, birthday, info, beforehand } = await readBody(event);
        const { day, indexMonth, year } = birthday;
        console.log(day, indexMonth, year);

        const newFriend = new BirthdayModel({
            name,
            surname,
            birthday,
            info,
            beforehand
        });

        await newFriend.save();


        return {
            status: 200, // Успешный статус
            body: { message: 'Friend data received successfully' },
        };
    } catch (error) {
        console.error('Error:', error.message);

        // Логирование ошибок в консоль
        console.error('Stack Trace:', error.stack);

        return {
            status: 500, // Внутренняя ошибка сервера
            body: { error: 'Internal Server Error' },
        };
    }
});

