// const updateWebsite = (newArray) =>{
//     dispatch(updateArray(newArray))
//     localStorage.setItem("live-text", JSON.stringify(newArray))   
// }
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'
export default function UpdateWebsite2({newArray}){
    const dispatch = useDispatch()
    dispatch(updateArray(newArray))
    localStorage.setItem("live-text", JSON.stringify(newArray))   
}