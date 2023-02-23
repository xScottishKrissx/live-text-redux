import { createSlice } from "@reduxjs/toolkit";

const defaultState = false

export const editState = createSlice({
    name:"editMode",
    initialState:{value:defaultState},
    reducers:{
        setEdit:(state, action) =>{
            console.log(action.payload)
            state.value = action.payload
        }
    }
})

export const {setEdit} = editState.actions
export default editState.reducer