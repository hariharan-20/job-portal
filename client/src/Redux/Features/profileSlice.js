import {createSlice} from "@reduxjs/toolkit"
export const profileSlice =createSlice({
    name:"profile",
    initialState:{
        profile:{},
        jobProfile:{},
        college:{},
        image:{}
    },
    
    reducers:{
        update:(state,action) => {
            state.profile = action.payload            
        },
        job:(state,action) =>{
            state.jobProfile =  action.payload
        },
        college:(state,action) =>{
            state.college =  action.payload
        },
        clear:(state) => {
            state.user =null
        },
        image:(state,action)=>{
            state.image = action.payload
        }
    },
})

export const {update,clear,job,college,image} = profileSlice.actions;

export const userProfile  = (state) => state.profile;


export default profileSlice.reducer