const formatToISOString = (dateObject) => {
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Добавляем 1, так как месяцы начинаются с 0
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');
    const timezoneOffset = dateObject.getTimezoneOffset(); // Получаем смещение времени в минутах

    // Рассчитываем знак и значения для временной зоны
    const timezoneSign = timezoneOffset > 0 ? '-' : '+';
    const timezoneHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
    const timezoneMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${timezoneHours}:${timezoneMinutes}`;
};
export default formatToISOString