// update-friend.js
import BirthdayModel from "~/server/models/Birthday.js";

export default defineEventHandler(async(event)=> {

  try {
    const body = await readBody(event);
    const { _id, name, surname, info, birthday } = body; // Access the "id" property from the body
    // const { day, month, year } = birthday;
    // console.log(_id, name, surname, info, day, month, year);
    if (!_id) {
      throw new Error('No ID provided');
    }
    await BirthdayModel.updateOne({ _id: _id }, {
        $set: {
          name: name,
          surname: surname,
          birthday: birthday,
          info: info,
        },
      }
    );

    return {
      status: 200,
      body: { message: 'Друг успешно обновлен' },
    };
  } catch (error){
    console.error('Ошибка при обновлении друга:', error.message);

    return {
      status: 500,
      body: { error: 'Внутренняя ошибка сервера' },
    };
  }
})
