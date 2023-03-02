import { createSlice } from "@reduxjs/toolkit";
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