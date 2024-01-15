// store/month.js
import { defineStore } from "pinia";
export const useMonths = defineStore('months', {
    state: ()=> ({
        months : [
            { name: 'January', indexMonth: 0, countDays: 31 },
            { name: 'February', indexMonth: 1, countDays: 29 },
            { name: 'March', indexMonth: 2, countDays: 31 },
            { name: 'April', indexMonth: 3, countDays: 30 },
            { name: 'May', indexMonth: 4, countDays: 31 },
            { name: 'June', indexMonth: 5, countDays: 30 },
            { name: 'July', indexMonth: 6, countDays: 31 },
            { name: 'August', indexMonth: 7, countDays: 31 },
            { name: 'September', indexMonth: 8, countDays: 30 },
            { name: 'October', indexMonth: 9, countDays: 31 },
            { name: 'November', indexMonth: 10, countDays: 30 },
            { name: 'December', indexMonth: 11, countDays: 31 }
        ]
    })
})