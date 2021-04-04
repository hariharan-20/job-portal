import axios from 'axios';
import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import LeftBoardArt from '../../../components/leftboardart/leftboardart';
import { BlueButton, TextField } from '../../../components/styledcomponent/styledcomponent';
import './forgotpass.css'

const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    background:#FFFFFF;
    flex-direction: row;           
`

const RightContainer = styled.div`
    padding: 12% 20%;
    @media(max-width: 500px) {
        // text-align: center;
        padding: 30% 15%;
    }
`

export const ForgotPassword = () => {
    const [email, setEmail] = useState()
    const [params,setParams] = useState()
    const [message,setMessage] = useState()
    const [paramstwo,setParamstwo] = useState()
    const [error,setError] = useState()
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        if(params){
            setMessage(Object.values(params)[0])
            console.log(Object.values(params)[0])
            setTimeout(()=>{
                setMessage("")
                setLoading(false)
            },3000)
        }
        if(paramstwo){
            setError(Object.values(paramstwo)[0].msg)
            console.log(Object.values(paramstwo)[0].msg)

            setTimeout(()=>{
                setError("")
            },3000)
        }
    },[params,paramstwo])
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(email)
        axios.post('http://localhost:8080/api/user/forgotPasswordLink', {email: email})
        .then( res => {
            console.log(res.request.response)
            setParams(JSON.parse(res.request.response))
            // setLoading(false)
        })
        .catch( err => {
            console.log(JSON.parse(err.request.response))
            if(err){
                setParamstwo(JSON.parse(err.request.response))
            }
       
            setLoading(false)
        })
    }

    return (
        <FlexRowWrapper className='form-container'>
            <LeftBoardArt></LeftBoardArt>
            <RightContainer>
                <div>
                    <h2>Forgot password</h2>
                    <div style={{ marginTop: "30px" }}></div>
                    <form onSubmit={handleSubmit} className='formcontainer'>
                        <div>
                            <TextField className='input' placeholder="Email" type="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>     
                        <p  style={{color:"lightgreen"}}>{message && message}</p>  
                        <p  style={{color:"red"}}>{error && error}</p>                   
                        <div>
                            <BlueButton style={{ marginTop: '5%'}} className='input' type="submit">{loading ? <i class="fas fa-spinner fa-pulse"></i> : 'Send Link'}</BlueButton>
                        </div>
                    </form>                    
                </div>
            </RightContainer>
        </FlexRowWrapper>
    )
}

export default ForgotPassword;