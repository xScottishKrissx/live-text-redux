import { createSlice } from "@reduxjs/toolkit";

const defaultState = JSON.parse( localStorage.getItem("activeLiveText")) || {}


export const activeLiveTextSlice = createSlice({
    name:"active-live-text",
    initialState:{value:defaultState},
    reducers:{
        setActiveLiveText:(state, action) =>{
            // console.log(state)
            // console.log(action)
            state.value = action.payload
            console.log(action.payload)
        }
    }
})

export const {setActiveLiveText} = activeLiveTextSlice.actions
export default activeLiveTextSlice.reducer