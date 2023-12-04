const convertDate = function (birthday) {
   try{
       const  { day, month, year } = birthday
       if(!day || !month) {
           throw new Error('Invalid date format')
       }
       const friendBirthday = new Date( year, month-1, day )

       // Получение названия месяца (полное название)
       const monthOptions = { month: "long"};
       const formattedMonth =friendBirthday.toLocaleDateString("en-US", monthOptions)

       // Получение дня месяца (без нулей)
       const formattedDay = friendBirthday.getDate();

       return `${formattedMonth} ${formattedDay}`;
   }catch (error) {
       console.error('Error in convertDate:', error.message);
       return 'Invalid Date';
   }
}
export default convertDate
