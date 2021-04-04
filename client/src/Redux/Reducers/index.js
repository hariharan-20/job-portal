import {combineReducers} from "redux"
import AuthReducer from "./Auth"


const allReducers =combineReducers({
    auth:AuthReducer
})


export default allReducers