import axios from 'axios';
import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import {useLocation,useHistory} from "react-router-dom"
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

export const ResetPassword = () => {
    const [NewPassword, setNewPassword ] = useState()
    const [ConfirmPassword, setConfirmPassword] = useState()
    const [errMessage, setErrMessage] = useState('')
    const [data,setData] =useState()
    const history = useHistory()
    // const location = useLocation()
    useEffect(()=>{
        const tokens = history.location.pathname.slice(13)
        setData(tokens)
    })
    
  
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // if(NewPassword !== '' || ConfirmPassword !== ''){
            if( NewPassword === ConfirmPassword && NewPassword) {
                setErrMessage('')
                axios.post('http://localhost:8080/api/user/newPassword', { password: NewPassword,token:data })
                .then( res => {
                    console.log(res)
                    if(res){
                        history.push({
                            pathname:"/signin"
                        })
                    }
                })
                .catch( err => {
                    console.log(err.message)
                })
                console.log('pass')
            } else {
                setErrMessage('Password does\'nt match')
            }        
        // } else {
        //     setErrMessage('Password Cannot be empty !')
        // }
    }

    return (
        <FlexRowWrapper className='form-container'>
            <LeftBoardArt></LeftBoardArt>
            <RightContainer>
                <div>
                    <h2>Reset password</h2>
                    <div style={{ marginTop: "30px" }}></div>
                    <form onSubmit={handleSubmit} className='formcontainer'>
                        <div style={{ marginTop: "15px" }}>
                            <TextField className='input' placeholder="NewPassword" name="newpassword" onChange={(e) => setNewPassword(e.target.value)} required/>
                        </div>                        
                        <div style={{ marginTop: "15px" }}>
                            <TextField className='input' placeholder="ConfirmPassword" name="confirmpassword" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        </div>                        
                        <div hidden={ errMessage !== '' ? false : true } style={{ marginTop: '15px'}}>
                            <label style={{ color: 'red', padding: '1%', fontSize: '15px' }}>{errMessage}</label>
                        </div>
                        <div>
                            <BlueButton className='input' style={{ marginTop: '5%'}} type="submit">Submit</BlueButton>
                        </div>
                    </form>                    
                </div>
            </RightContainer>
        </FlexRowWrapper>
    )
}

export default ResetPassword;