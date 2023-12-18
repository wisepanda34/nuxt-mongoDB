import birthdayModel from "@/server/models/Birthday.js";

export default defineEventHandler( async ()=> {
  try{
    const currentDate = new Date();
    const response = await birthdayModel.find();

    return { birthdays: response };
  }catch (error) {
    console.log(error);
  }
});