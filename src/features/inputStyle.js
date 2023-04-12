import { createSlice } from "@reduxjs/toolkit";

const defaultState = JSON.parse( localStorage.getItem("selectInputStyle")) || false

export const inputStyle = createSlice({
    name:"inputStyle",
    initialState:{value:defaultState},
    reducers:{
        setInputStyle:(state,action) =>{
            state.value = action.payload
            localStorage.setItem("selectInputStyle", JSON.stringify(action.payload))
        }
    }
})

export const {setInputStyle}=inputStyle.actions
export default inputStyle.reducer