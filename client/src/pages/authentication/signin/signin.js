import axios from 'axios'
import "./signin.css"
import React, { useState,useEffect, useRef } from 'react'
import LeftBoardArt from '../../../components/leftboardart/leftboardart';
import {  BlueButton } from '../../../components/styledcomponent/styledcomponent';
import { useDispatch, useSelector } from "react-redux"
import {fetchUser, selectUser,selectErr } from "../../../Redux/Features/userSlice"
import { useHistory,useLocation } from 'react-router-dom';
import EmailIcon from '../../../assets/email.svg'
import Password from "../../../assets/password.svg"
import PasswordEyeIcon from '../../../assets/passwordeye.svg'
import styled from 'styled-components'

const SignInDiv =styled.div`
     height:45px;
     width:350px;
     border:1px solid #ccc;
     border-radius:5px;
     display:flex;
     align-items:center;
     padding:10px;
     &:focus {
        outline: none;
        background-color:white;
    }
    background-color:white;
`
export const TextField = styled.input `
    width:100%;
    border: px solid #ccc;
    font-size: 14px;
    border-radius: 8px;
    // margin-top: 6px;    
    &:focus{        
        outline: none;        
    }
`
const Bluebutton = styled(BlueButton)`
    @media(max-width: 500px){
        width: 100%;
        padding: 3%;
    }
`

const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    flex-direction: row;       
    @media(max-width: 500px){
        margin-top: 17%;
    } 
`

const  SignIn = () => {    
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)    
    const error = useSelector(selectErr)
    const [params,setParams]=useState('')
    const seekerBtnRef = useRef()
    const employeeBtnRef = useRef()
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const [data] = useState(user)
    const [err,setErr]=useState()
    const [loading,setLoading]=useState(false)
    console.log(error)
    // const [state] = useState(location.state)
    // const [usertype,setUserType]=useState()

    const seekerBtnClick = () => {
        seekerBtnRef.current.style.backgroundColor = '#5471E8'
        seekerBtnRef.current.style.color = '#FFFFFF'
        employeeBtnRef.current.style.backgroundColor = '#EAEAEA'
        employeeBtnRef.current.style.color = '#7C7C7C'
    }

    const employeeBtnClick = () => {
        employeeBtnRef.current.style.backgroundColor = '#5471E8'
        employeeBtnRef.current.style.color = '#FFFFFF'
        seekerBtnRef.current.style.backgroundColor = '#EAEAEA'
        seekerBtnRef.current.style.color = '#7C7C7C'

    }

    useEffect(()=>{      
        if(location.state){       
         const message = location.state.message
         console.log(message,"singin")
        setParams(message)
        setTimeout(() =>{
            setParams("")
        },3000)}

        if(user && user.status === 200) {
            if(user.data.userType === 'U'){
                history.push('/')
            }            
            if(user.data.userType === 'A'){
                history.push('/admin/dashboard')
            }            

            localStorage.setItem('userType', user.data.userType)
        }

        // if(params !== ''){
        //     setParams(location.state ? location.state.message: '')                        
        //     setTimeout(()=>{
        //         setParams('')
        //     },5000)
        // }
        if(error){
           setErr("invalid credentials")
           setTimeout(()=>{
               setErr("")
           },3000)
        }
    },[error, user])
    
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })        
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault() 
        setTimeout(()=>{
            
            dispatch(fetchUser(userData))
            
        },3000)      
        
          
    }

    return (
        <FlexRowWrapper  className="signin-container">
            <LeftBoardArt className="left-container"></LeftBoardArt>
            <div className="right-container">
                <div >
                    <h2 style={{fontSize: '25px '}}>Sign In</h2>
                    <FlexRowWrapper style={{ marginTop: "20px", justifyContent:'space-between' }}>
                        <BlueButton ref={seekerBtnRef} style={{width: '49%'}} onClick={seekerBtnClick}>Job seeker</BlueButton>
                        <BlueButton ref={employeeBtnRef} style={{ width: '49%', background: "#EAEAEA", color: '#7C7C7C' }} onClick={employeeBtnClick}>Employer</BlueButton>
                    </FlexRowWrapper>
                    <div style={{ marginTop: "30px" }}></div>
                    <form onSubmit={handleSubmit} className="formcontainer">
                        <SignInDiv>
                            <img src={EmailIcon} style={{ width: '12px', cursor: 'pointer', marginBottom: '0px' }} />
                            <TextField className="input"  placeholder="Email" name="email" type="email" onChange={handleChange} required/>
                             
                        </SignInDiv>
                   <div style={{ marginTop: "15px" }} >
                        <SignInDiv>
                        <img src={Password} style={{ width: '12px', cursor: 'pointer', marginBottom: '0px' }} />
                        <TextField className="input" style={{width:"75vw"}} type="password" placeholder="Password" name="password" onChange={handleChange}  required/>    
                        <img onClick={(e) => e.target.previousSibling.type === 'password' ?
                                        e.target.previousSibling.type = 'text' :
                                        e.target.previousSibling.type = 'password'
                                } 
                                src={PasswordEyeIcon} style={{ width: '15px',height:"17px", cursor: 'pointer',     marginBottom: '0px'}}/>
                        
                        </SignInDiv>
                           
                                                       
                        </div>
                        <p style={{fontSize:"12px",color:"red", margin: 0, padding: 0}}>{
                             err
                        }</p>
                        <p style={{fontSize:"12px",color:"red", margin: 0, padding: 0}}>{
                             params
                        }</p>
                        <div style={{ textAlign: 'end', padding: '3.5% 0'}}>
                            <a href='/forgotPassword' style={{ color: '#5471E8', textDecoration: 'none', fontSize: '13px', cursor: 'pointer', fontWeight: 500, }}>Forgot password ?</a>
                        </div>
                        <div>
                            <Bluebutton type="submit" className={loading ? 'opacity' : null} disabled={loading}>{loading ? <i class="fas fa-spinner fa-pulse"></i> : 'Sign In'}</Bluebutton>
                           
                           
                        </div>
                    </form>
                    <div>
                        <p style={{ fontSize: "13px", marginTop: '15px', fontWeight: 500,letterSpacing: '0.3px' }}>Don't have an account?<span style={{ color: '#5471E8', cursor: 'pointer'}} onClick={()=>{history.push({pathname:"/signup"})}}> Register</span> now!</p>   
                    </div>
                </div>
            </div>
        </FlexRowWrapper>
    )
}

export default SignIn;