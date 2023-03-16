import { createSlice } from "@reduxjs/toolkit";

// const getLocalStorage =  JSON.parse(localStorage.getItem("live-text"))
const getLocalStorage =  JSON.parse(localStorage.getItem("liveTextMaster"))
const defaultState = getLocalStorage ||  [] 

// console.log(defaultState)

// const text = []
// const thing1 = {"name" : "chris", "age":20, "job":"bricky"}
// const thing2 = {"name" : "dave", "age":20, "job":"bricky"}
// text.push(defaultState)
// text.push(thing2)
// console.log(text)
export const liveTextSlice = createSlice({
    name:"live-text",
    initialState: {value:defaultState},
    reducers:{
        updateArray:(state,action) =>{
            state.value = action.payload
        }
    }
})

export const {updateArray} = liveTextSlice.actions
export default liveTextSlice.reducer