import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage =  localStorage.getItem("loggedIn")
const defaultState= getLocalStorage || false

export const loggedInState = createSlice({
    name:"loggedIn",
    initialState:{value: defaultState},
    reducers:{
        setLoggedIn:(state, action) =>{
            console.log(action.payload)
            state.value = action.payload
            localStorage.setItem("loggedIn", action.payload)
        }
    }
})

export const {setLoggedIn} = loggedInState.actions
export default loggedInState.reducer