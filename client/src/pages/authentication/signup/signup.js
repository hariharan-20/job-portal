import styled from 'styled-components'
import React, { useRef, useState } from 'react'
import { BlueButton } from '../../../components/styledcomponent/styledcomponent'
import LeftBoardArt from '../../../components/leftboardart/leftboardart'
import axios from "axios"
import { useHistory } from 'react-router-dom';
import Phone from "../../../assets/phone.svg";
import User from "../../../assets/userediticon.svg";
import EmailIcon from '../../../assets/email.svg'
import Password from "../../../assets/password.svg"
import PasswordEyeIcon from '../../../assets/passwordeye.svg'
import "../signin/signin.css"

const SignInDiv =styled.div`
     height:45px;
     width:350px;
     border:1px solid #ccc;
     border-radius:8px;
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
    
    // border: 2px solid #ccc;
    // border-radius: 8px;
    // margin-top: 6px;    
    font-size: 14px;
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


const SignUp = () =>{
    const history = useHistory()
    const [loading,setLoading]=useState(false)
    const seekerBtnRef = useRef()
    const employeeBtnRef = useRef()
    const [userData, setUserData] = useState({
        name:"",
        phone:null,
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit =(e) =>{
        setLoading(true)
        e.preventDefault()         
         axios({
             method:"post",
             url:"/api/user/new",
             data:userData
         })
         .then((res)=>{
            if(res.status == 200) {
                localStorage.setItem('userType',res.data.userType)
                history.push('/')
            }                                
            console.log(res)
            
         }).catch((err) =>{
            console.log(err.message)
            history.push({
                pathname:"/signin",
                state:{
                    message:"User already taken"
                }
            })
         })

    }

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

        return <FlexRowWrapper className="signin-container">
            <LeftBoardArt className="left-container"></LeftBoardArt>
            <div className="right-container">
                <div>
                    <h2 style={{ fontSize: '25px'}}>Register</h2>
                    <FlexRowWrapper style={{ marginTop: "20px", justifyContent:'space-between' }}>
                        <BlueButton ref={seekerBtnRef} style={{width: '49%'}} onClick={seekerBtnClick}>Job seeker</BlueButton>
                        <BlueButton ref={employeeBtnRef} style={{ width: '49%', background: "#EAEAEA", color: '#7C7C7C' }} onClick={employeeBtnClick}>Employer</BlueButton>
                    </FlexRowWrapper>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: "15px" }}>
                            <SignInDiv>
                            <img src={User} style={{ width: '12px', cursor: 'pointer', marginBottom: 0 }} />  
                            <TextField className="input"  placeholder="Name" name="name" onChange={handleChange} value={userData.name} required/>
                            </SignInDiv>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                           <SignInDiv>
                           <img src={Phone} style={{ width: '12px', cursor: 'pointer', marginBottom: 0 }} />
                            <TextField className="input" placeholder="Mobile no." name="phone" onChange={handleChange} value={userData.phone} required/>
                            </SignInDiv>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                        <SignInDiv>
                        <img src={EmailIcon} style={{ width: '12px', cursor: 'pointer', marginBottom: 0 }} />
                            <TextField className="input" placeholder="Email" name="email" onChange={handleChange} value={userData.email} required/>
                            </SignInDiv>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                        <SignInDiv>
                        <img src={Password} style={{ width: '12px', cursor: 'pointer', marginBottom: 0 }} />
                            <TextField className="input" style={{width:"75vw"}}  placeholder="Password" name="password" type="password" onChange={handleChange} value={userData.password} required/>                            
                            <img onClick={(e) => e.target.previousSibling.type === 'password' ?
                                        e.target.previousSibling.type = 'text' :
                                        e.target.previousSibling.type = 'password'
                                } 
                                src={PasswordEyeIcon} style={{ width: '17px', marginLeft: '-25px', cursor: 'pointer', marginBottom: 0}}/>
                        </SignInDiv>
                        </div>
                        <div style={{ marginTop: "15px", display:'flex' }}>
                            <input type='checkbox' required/>
                            <label style={{  margin: '-2px 0 0 10px',fontSize: '13px', fontWeight: 500, letterSpacing: '0.2px' }}>I agree to <a style={{ color: '#538CD6', cursor: 'pointer' }}>terms and policies</a></label>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <Bluebutton type="submit"  className={loading ? 'opacity' : null} disabled={loading}>{loading ? <i class="fas fa-spinner fa-pulse"></i> : 'Register'}</Bluebutton>
                        </div>
                    </form>
                    <div>
                        <p style={{ fontSize: "13px", marginTop: '20px', fontWeight: 500, letterSpacing: '.2px' }}>Already have an account? <span onClick={()=>{history.push({pathname:"/signin"})}} style={{ color: '#5471E8', cursor: 'pointer' }}>Sign In</span> now!</p>
                    </div>
                </div>
            </div>
        </FlexRowWrapper>
    }

export default SignUp