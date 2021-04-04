import {createSlice} from "@reduxjs/toolkit"

export const toastSlice = createSlice({
    name:"toast",
    initialState:{
        view: false
    },
    
    reducers:{
        changeToast:(state,action) => {
            state.view = action.payload
            }       
    },
})

export const {changeToast} = toastSlice.actions;

export const toastReducer  = (state) => state.toast.view;
export default toastSlice.reducer