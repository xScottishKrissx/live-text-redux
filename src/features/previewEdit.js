import { createSlice } from "@reduxjs/toolkit";

// localStorage.clear()
// const getLocalStorage = JSON.parse(localStorage.getItem("preview-edit"))

const defaultState = []

export const previewEditItem = createSlice({
    name:"preview-item",
    initialState:{value:defaultState},
    reducers:{
        addToPreview:(state,action) =>{
            state.value = action.payload
        }
    }
})

export const {addToPreview} = previewEditItem.actions
export default previewEditItem.reducer