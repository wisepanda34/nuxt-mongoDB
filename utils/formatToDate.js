import formatToISOString from "~/utils/formatToISOString.js";

const formatToDate = (dateString) => {
    const dateComponents = dateString.split('/'); // Разделить строку по '/'
    const day = parseInt(dateComponents[0], 10); // Преобразовать день в число
    const month = parseInt(dateComponents[1], 10) - 1; // Преобразовать месяц в число (значение месяца в объекте Date начинается с 0)
    const year = parseInt(dateComponents[2], 10);

    const dateObject = new Date(year, month, day);
    const isoString = formatToISOString(dateObject);
    return isoString;
}
export default formatToDate