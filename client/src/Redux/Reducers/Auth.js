const AuthReducer = (state = false,action)=>{
     switch(action.type){
         case "ISLOGGED":
             return state = true
         case "LOGGEDOUT":
             return !state
        default : return state
     }
}

export default AuthReducer