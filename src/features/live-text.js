import { createSlice } from "@reduxjs/toolkit";

// const getLocalStorage =  JSON.parse(localStorage.getItem("live-text"))
const getLocalStorage = JSON.parse(localStorage.getItem("liveTextMaster"))
const defaultState = getLocalStorage ||  [] 

export const liveTextSlice = createSlice({
    name:"live-text",
    initialState: {value:defaultState},
    reducers:{
        updateArray:(state,action) =>{
            state.value = action.payload
            // console.log(action.payload)
            localStorage.setItem("liveTextMaster", JSON.stringify(action.payload))
        }
    }
})

export const {updateArray} = liveTextSlice.actions
export default liveTextSlice.reducer