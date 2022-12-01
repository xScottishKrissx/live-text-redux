import { createSlice } from "@reduxjs/toolkit";

const defaultState = "Item 1"

export const itemSlice = createSlice({
    name:"item",
    initialState:{value:defaultState},
    reducers:{
        addItem:(state,action) =>{
            state.value = action.payload
        }
    }
})

export const{addItem} = itemSlice.actions
export default itemSlice.reducer