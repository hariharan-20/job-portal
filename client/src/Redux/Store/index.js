import {configureStore} from '@reduxjs/toolkit'
import userReducer from "../Features/userSlice"
import profileReducer from "../Features/profileSlice"
import {composeWithDevTools} from "redux-devtools-extension"
import modalReducer from "../Features/modals"
import searchReducer from "../Features/search"
import toastReducer from '../Features/alertToast'

export default configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        modal:modalReducer,
        search:searchReducer,
        toast: toastReducer,
    }
})