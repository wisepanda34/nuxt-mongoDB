const convertDate = function (dateString) {
    const dateObject = new Date(dateString);
    // Получение дня месяца (без нулей)
    const day = dateObject.getDate();

    // Получение названия месяца (полное название)
    const monthOptions = { month: "long" };
    const month = dateObject.toLocaleDateString("en-US", monthOptions);
    return `${day} ${month}`
}
export default convertDate


// const convertDate = function (dateString) {
//     const dateObject = new Date(dateString);
//     // Получение дня месяца (без нулей)
//     const day = dateObject.getDate();
//
//     // Получение названия месяца (полное название)
//     const monthOptions = { month: "long" };
//     const month = dateObject.toLocaleDateString("en-US", monthOptions);
//     return `${day} ${month}`
// }
// export default convertDate