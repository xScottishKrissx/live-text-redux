import { createSlice } from "@reduxjs/toolkit";

const defaultState= {loggedIn:false}

export const loggedInState = createSlice({
    name:"loggedIn",
    initialState:{value: defaultState},
    reducers:{
        setLoggedIn:(state, action) =>{
            state.value = action.payload
        }
    }
})

export const {setLoggedIn} = loggedInState.actions
export default loggedInState.reducer