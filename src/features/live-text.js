import { createSlice } from "@reduxjs/toolkit";
import saveToFireStore from "../components/User/saveToFirestore";
// const getLocalStorage =  JSON.parse(localStorage.getItem("live-text"))
const getLocalStorage = JSON.parse(localStorage.getItem("liveTextMaster"))
const defaultState = getLocalStorage ||  [] 
// console.log(defaultState)
export const liveTextSlice = createSlice({
    name:"live-text",
    initialState: {value:defaultState},
    reducers:{
        updateArray:(state,action) =>{
            state.value = action.payload
            // console.log(action.payload)
            localStorage.setItem("liveTextMaster", JSON.stringify(action.payload))
            saveToFireStore(action.payload)
        }
    }
})

export const {updateArray} = liveTextSlice.actions
export default liveTextSlice.reducer