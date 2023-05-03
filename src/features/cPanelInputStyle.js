import { createSlice } from "@reduxjs/toolkit";

const defaultState = JSON.parse( localStorage.getItem("selectCPanelInputStyle")) || false

export const cPanelInputStyle = createSlice({
    name:"cPanelInputStyle",
    initialState:{value:defaultState},
    reducers:{
        setCPanelInputStyle:(state,action) =>{
            state.value = action.payload
            localStorage.setItem("selectCPanelInputStyle", JSON.stringify(action.payload))
        }
    }
})

export const { setCPanelInputStyle }=cPanelInputStyle.actions
export default cPanelInputStyle.reducer