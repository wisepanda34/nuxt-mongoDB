import UserModel from "~/server/models/Users.js";

export default defineEventHandler(async (event) => {
  try{
    const { email, password } = await readBody(event);

    const existingUser = await UserModel.findOne({ email });
    console.log('existingUser:',existingUser);
    //todo status 400
    if (existingUser) {
      return {
        status: 400,
        body: { error: 'User with this email already exists' },
      };
    }else{
      const newUser = UserModel({
        email,
        password
      });

      await newUser.save();

      return {
        status: 200,
        body: { message: 'User data received successfully' },
      };
    }

  }catch (error){
    console.error('Error:', error.message);
    console.log('Error:', error.message);
    console.error('Stack Trace:', error.stack);

    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
});