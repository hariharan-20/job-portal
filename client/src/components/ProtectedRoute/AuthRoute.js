import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'

const AuthRoute = ({
    component: Component,    
    ...rest
}) => {
    const [ userType, setType ] = useState()

    useEffect(() => {
        axios.get('/api/user/isAuthenticated')
        .then(res => {
            console.log(res.data)
            setType(res.data.userType)
        })
        .catch(err => {
            console.log(err.request.response)
            setType(null)
        })
    }, [])

    return (
        <>
            {userType ?
                <>
                {userType === 'U' &&
                    <Route {...rest} render={(props) => {                                        
                        return <Redirect to={{ pathname: '/', state: {from: props.location }}} /> 
                    }}/>}
                {userType === 'A' &&
                    <Route {...rest} render={(props) => {                                                            
                        return <Redirect to={{ pathname: '/admin/dashboard', state: {from: props.location }}} />
                    }}/>}
                </> :
                <Route {...rest} render={(props) => {                                                                                
                    return <Component {...props} />
                }}/>
            }
            {/* <Route {...rest} render={(props) => {                                                                                
                    return <Component {...props} />
            }}/> */}
        </>        
    )
}

export default AuthRoute