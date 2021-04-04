import {createSlice} from "@reduxjs/toolkit"
export const searchSlice =createSlice({
    name:"search",
    initialState:{
        search:[],
        length:[],
    },
    
    reducers:{
        search:(state,action) => {
            state.search =action.payload
            },
        length:(state,action) =>{
            state.length = action.payload
        }
       
    },
})

export const {search,length} = searchSlice.actions;

export const searchBar  = (state) => state.search;
export const searchLength  = (state) => state.length;
export default searchSlice.reducer