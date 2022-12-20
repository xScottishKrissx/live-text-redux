import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage =  JSON.parse(localStorage.getItem("live-text"))
const defaultState = getLocalStorage ||  [{}] 

export const liveTextSlice = createSlice({
    name:"live-text",
    initialState: {value:defaultState},
    reducers:{
        updateArray:(state,action) =>{
            state.value = action.payload
        }
    }
})

export const {updateArray} = liveTextSlice.actions
export default liveTextSlice.reducer