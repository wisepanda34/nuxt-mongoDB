const convertAge = function (birthday) {
    try{
        const currentDate = new Date()
        const  { day, indexMonth, year } = birthday
        if(!year) {
            return ''
        }else{
            const friendBirthday = new Date(year, indexMonth - 1, day);

            // Вычисляем разницу в миллисекундах между текущей датой и днем рождения
            const ageInMilliseconds = currentDate - friendBirthday;

            // Переводим миллисекунды в годы, используя приблизительную длину года в миллисекундах
            const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);

            // Округляем возраст до целых лет
            const roundedAge = Math.floor(ageInYears);

            return `${roundedAge} year`;
        }

    }catch (error) {
        console.error('Error in convertAge:', error.message);
        return 'Invalid Date';
    }
}
export default convertAge
