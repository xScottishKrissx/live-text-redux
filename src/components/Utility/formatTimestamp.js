import dayjs from "dayjs"
export const formatTimestamp = (input) =>{
    return dayjs(input).format('HH:mm - dddd, MMM YYYY')
}