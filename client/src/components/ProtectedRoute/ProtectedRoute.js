import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({
    component: Component,    
    ...rest
}) => {
    const [ userType, setType ] = useState(localStorage.getItem('userType'))
    // const getuserType = asyn() => await axios.get('/api/user/isAuthenticated')
    // .then(res => {
    //     console.log(res.data)
    //     setType(res.data.userType)
    // })
    // .catch(err => {
    //     console.log(err )
    //     setType(null)
    // })

    // useEffect(() => {
      
    // }, [userType])

    return (
        
        <>
            {
                userType === 'U' ?
                <Route {...rest} render={(props) => {                                
                    return <Component {...props} />                                         
                }}/>
                :
                <Route {...rest} render={(props) => {                                                 
                    return <Redirect to={{ pathname: '/signin', state: {from: props.location }}} />                
                }}/>
            }
            {/* <Route {...rest} render={(props) => {                                
                    return <Component {...props} />                                         
                }}/> */}            
        </>
    )
}

export default ProtectedRoute