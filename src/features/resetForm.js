import { createSlice } from "@reduxjs/toolkit";

const defaultState = ""

export const resetForm = createSlice({
    name:"resetForm",
    initialState:{value:defaultState},
    reducers:{
        setForm:(state,action) =>{
            state.value = action.payload
        }
    }
})

export const {setForm}=resetForm.actions
export default resetForm.reducer



