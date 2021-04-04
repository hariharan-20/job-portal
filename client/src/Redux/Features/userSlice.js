import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { useHistory } from 'react-router-dom'

export const userSlice =createSlice({
    name:"user",
    initialState:{
        // isLoading: 'false',
        user:{},        
        error: '',
        // logout:{},
        // isLoggedIn: false
    },
    
    reducers:{
        login:(state,action) => {            
            state.user = action.payload
            // state.isLoggedIn = true
        },
        logout:(state) => {
            state.user = {}
            state.logout = 'success'
        },
        error:(state,action) =>{
            state.error = action.payload
        }
    },
})

export const {login,logout,error} = userSlice.actions;
export const fetchUser = (value) => async dispatch  => {        
    axios({
        method:"post",
        url:"/api/user/login",
        data:value
    })
    .then((res) => {
    console.log(res)
    if(res.status === 200){
        dispatch(login(res))
    }
    })
    .catch((err) => {        
        dispatch(error(err.message))
        if(err.status == "403"){
            window.location.replace("/signin")
        }
    })      
}

export const logoutUser = () => async dispatch => {
    axios({
        method: 'get',
        url: '/api/user/logout',        
    })
    .then(res => {
        dispatch(logout(res))
        if(res.status === 200) {
            localStorage.removeItem('userType')
            window.location.replace('/')
        }        
    })
    .catch(err => {
        dispatch(error(err.message))       
    })
}

export const selectUser  = (state) => state.user.user;
export const selectErr  =  (state)  => state.user.error;
export default userSlice.reducer