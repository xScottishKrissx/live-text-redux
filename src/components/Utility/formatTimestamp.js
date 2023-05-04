import dayjs from "dayjs"
// Needed for ordinals - 1st, 2nd, 3rd etc 
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

export const formatTimestamp = (input) =>{
    return dayjs(input).format('HH:mm - dddd, Do MMM YYYY')
}