import birthdayModel from "~/server/models/Birthday.js"

export default defineEventHandler( async ()=> {
  try{
    const currentDate = new Date();
    const response = await birthdayModel.find()
    response.sort((a, b) => {
      const dateA = new Date(currentDate.getFullYear(), a.birthday.month, a.birthday.day);
      const dateB = new Date(currentDate.getFullYear(), b.birthday.month, b.birthday.day);

      // Сравниваем даты
      return dateA - dateB;
    });
    return { birthdays: response }
  }catch (error) {
    console.log(error)
  }
})