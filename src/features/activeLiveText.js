import { createSlice } from "@reduxjs/toolkit";

const defaultState = JSON.parse( localStorage.getItem("activeLiveText")) || []

export const activeLiveTextSlice = createSlice({
    name:"active-live-text",
    initialState:{value:defaultState},
    reducers:{
        setActiveLiveText:(state, action) =>{
            state.value = action.payload
        }
    }
})

export const {setActiveLiveText} = activeLiveTextSlice.actions
export default activeLiveTextSlice.reducer