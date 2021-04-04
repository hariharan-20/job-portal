import {createSlice} from "@reduxjs/toolkit"
export const modalSlice =createSlice({
    name:"modal",
    initialState:{
        view:false
    },
    
    reducers:{
        change:(state,action) => {
            state.view =action.payload
            }
       
    },
})

export const {change} = modalSlice.actions;

export const modalView  = (state) => state.modal.view;


export default modalSlice.reducer