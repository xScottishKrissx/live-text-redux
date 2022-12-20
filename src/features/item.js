import { createSlice } from "@reduxjs/toolkit";

const defaultState = []

export const itemSlice = createSlice({
    name:"item",
    initialState:{value:defaultState},
    reducers:{
        addItem:(state,action) =>{
            // state.value.push(action.payload) -- add to array
            state.value = action.payload
        },
        
        
    }
})

export const{addItem} = itemSlice.actions
export default itemSlice.reducer