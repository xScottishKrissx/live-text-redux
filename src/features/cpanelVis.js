import { createSlice } from "@reduxjs/toolkit";

const defaultState = true

export const cPanelVisSlice = createSlice({
    name:"cPanelVis",
    initialState:{value:defaultState},
    reducers:{
        setCPanelVis:(state, action) =>{
            state.value = action.payload
        }
    }
})

export const {setCPanelVis} = cPanelVisSlice.actions
export default cPanelVisSlice.reducer