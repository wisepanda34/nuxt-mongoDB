
const convertDate = function (birthday, params) {
   try{
       const  { day, indexMonth, year } = birthday

       if(year){
           const friendBirthday = new Date( year, indexMonth-1, day )

           // Получение названия месяца (полное название)
           const monthOptions = { month: "long"};
           const formattedMonth = friendBirthday.toLocaleDateString("en-US", monthOptions)

           // Получение дня месяца (без нулей)
           const formattedDay = friendBirthday.getDate();

           return `${formattedMonth} ${formattedDay}`;
       }else{
           const formattedDay = day
           const foundMonth = params.months.find(item => item.indexMonth === indexMonth)

            if(foundMonth) {
                return `${foundMonth.name} ${formattedDay}`;
            }else {
                console.error('Error in convertDate: Month not found');
                return 'Month not found';
            }
       }
   }catch (error) {
       console.error('Error in convertDate:', error.message);
       return 'Invalid Date in convertDate';
   }
}
export default convertDate
