import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import "./navbar.css"
import styled from 'styled-components'
import { FlexRowWrapper, BlueButton } from '../styledcomponent/styledcomponent'

import { logoutUser } from "../../Redux/Features/userSlice"
import { useDispatch } from "react-redux"
import Verzeologo from "../../assets/verzeo logo.svg"
// import NotificationIcon from '../../assets/navbarnotification.svg'
// import MessageIcon from '../../assets/navbarmessage.svg'
import LogoutIcon from '../../assets/logout.svg'
import DownArrowIcon from '../../assets/downarrow.svg'
import SuitCaseIcon from '../../assets/navbarsuitcase.svg'

// import Avatar from '../../assets/guestavatar.svg'
// import axios from 'axios'

const StyledLink = styled.a`    
    color: ${props => props.Blue ? '#5471E8' : '#2B2B2B'};    
    font-weight: 500;
    cursor: pointer;
    padding-top: 4%; 
    text-decoration: none;
    &:focus {
        outline: none
    }
`

const Linkdiv = styled.div`
    padding-top: 3%;
    width: ${props => props.width};    
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: #D6DEFF48;
    }
    &:focus {
        background-color: #D6DEFF48;
    }
`
const Indicator = styled.div`
    background: #5471EB;
    border-radius: 4px;        
    border: 1px solid #5471E8;
    height: 1px;
    margin-top: 2.7vh; 
    display: none;
    ${Linkdiv}:hover &{
        display: block;
    }
    ${Linkdiv}:focus &{
        outline: none;
        display: block;
    }
`
const IconDiv = styled.div`
    padding-top: ${props => props.paddingtop};
    margin: 0 4%;
    cursor: pointer;
`
const ProfileDiv = styled.div`
    display:flex;
    margin-top: 0.7vh;  
    cursor: pointer; 
`

const DropDownDiv =styled.div` 
    position: absolute;   
    padding: 1vh 2vw;
    background-color:white;
    margin-left: -100px;         
    display: ${props => props.hover ? 'block' : 'none'}  
`

const Navbar = () => {          
    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)   

    const history = useHistory()  
    const [isLoggedIn, setIsLogged] = useState(false)

    const img =localStorage.getItem("image")   
    const userType = localStorage.getItem('userType')        

    // const [userType, setType] = useState()    
     
    // const getuserType = async() => await axios.get('/api/user/isAuthenticated')
    // .then(res => {        
    //     setType(res.data.userType)
    // })
    // .catch(err => {
    //     console.log(err )
    //     setType(null)
    // })

    useEffect(() => {                 
        if(userType){
            setIsLogged(true) 
        }else {
            setIsLogged(false)
        }                      
    },[isLoggedIn, userType])

    const handleLogout = (e) =>{
        e.preventDefault()
        dispatch(logoutUser())                                
    }

    // const handleMyprofile = () => {
    //     userType ==='A' && history.push('/admin/myprofile')        
    //     userType === 'U' && history.push('/myprofile')        
    // }    

    return (
        <FlexRowWrapper style={{justifyContent: 'space-around', background: '#FFFFFF', height: '10vh'}}>            
            
            <img onClick={() => history.push(userType==='A' ? '/admin/dashboard' : '/')} src={Verzeologo} style={{color: '#2680EB', margin: 0, width: '7%', cursor: 'pointer'}}/>
            <FlexRowWrapper style={{width: '40%'}}>                
                {userType === 'A' ?
                <>
                    <Linkdiv width={'30%'}>
                    <StyledLink href='/admin/dashboard'>Dasboard</StyledLink>
                    <Indicator/>
                </Linkdiv>
                <Linkdiv width={'30%'}>
                    <StyledLink href='/admin/postedjobs'>Job Posted</StyledLink>
                    <Indicator/>
                </Linkdiv>
                </>
                :
                <>                
                <Linkdiv onClick={() => history.push('/')} width={'20%'}>      
                    {/* {history.location.pathname === '/' && setIsactiveTab(true)}               */}
                    <StyledLink >All jobs</StyledLink>                    
                    <Indicator/>
                </Linkdiv>
                <Linkdiv width={'30%'}>
                    <StyledLink>Government Jobs</StyledLink>
                    <Indicator/>
                </Linkdiv>
                <Linkdiv width={'30%'}>
                    <StyledLink>Mass recruiter</StyledLink>
                    <Indicator/>
                </Linkdiv>
                {/* <Linkdiv width={'15%'}>
                    <StyledLink>More</StyledLink>
                    <Indicator/>
                </Linkdiv> */}
                </>
                }
            </FlexRowWrapper>
            <FlexRowWrapper isLogged={isLoggedIn} style={{width: '30%', justifyContent: 'center'}} >
                <StyledLink Blue href='/signIn'>Sign in</StyledLink>
                <BlueButton onClick={() => history.push('/signUp') } style={{width: '35%', padding: 0, margin: '3%'}}>Register for free</BlueButton>
            </FlexRowWrapper >
            <FlexRowWrapper style={{ width: '35%', justifyContent: 'center', padding: '0.7%'}} isLogged={!isLoggedIn}>
                {/* <IconDiv paddingtop={'1%'}>
                    <img style={{width: '1.7vw'}} src={NotificationIcon} />
                </IconDiv>
                <IconDiv paddingtop={'1.8%'}>
                    <img style={{width: '1.2vw'}} src={MessageIcon} />
                </IconDiv> */}
                <IconDiv paddingtop={'0'}>
                    <ProfileDiv onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>                                                
                        <StyledLink style={{padding: 0 }}>My profile</StyledLink>
                        <img src={DownArrowIcon} style={{marginLeft:"8px", width: '15px'}}/>                        
                    </ProfileDiv>
                    <DropDownDiv hover={hover} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>                                              
                    {userType === 'U'&&
                    <>
                        <div onClick={() => history.push('/myprofile')} style={{ padding: '2.5vh 0 1.5vh 0'}}>
                        <span style={{display:"flex"}}>
                            <img src={SuitCaseIcon}/>
                            <StyledLink style={{fontSize:"14px",color:"#9D9D9D",margin:"0 20px", padding: 0}}>View my profile</StyledLink>
                        </span>                                                                                       
                    </div>         
                    <div onClick={() => history.push('/appliedjobs')} style={{ padding: '2.5vh 0 1.5vh 0'}}>
                        <span style={{display:"flex"}}>
                            <img src={SuitCaseIcon}/>
                            <StyledLink style={{fontSize:"14px",color:"#9D9D9D",margin:"0 20px", padding: 0}}>View applied Jobs</StyledLink>
                        </span>                                                                                       
                    </div> 
                    {/* <div onClick={() => history.push('/savedjobs')} style={{ padding: '2.5vh 0 1.5vh 0'}}>
                        <span style={{display:"flex"}}>
                            <img src={SuitCaseIcon}/>
                            <StyledLink style={{fontSize:"14px",color:"#9D9D9D",margin:"0 20px", padding: 0}}>View Saved Jobs</StyledLink>
                        </span>                                                                                       
                    </div>             */}
                    <div onClick={(e) => handleLogout(e)} style={{ padding: '1.5vh 0'}}>
                        <span style={{display:"flex"}}>
                            <img src={LogoutIcon}/>
                            <StyledLink style={{fontSize:"14px",color:"#9D9D9D",margin:"0 20px", padding: 0}}>Logout</StyledLink>
                        </span>                                                                                       
                    </div>                                  
                    </>
                    }  
                    {userType === 'A' && 
                    <>
                        {/* <div onClick={handleMyprofile} style={{ padding: '2.5vh 0 1.5vh 0'}}>
                        <span style={{display:"flex"}}>
                            <img src={DownArrowIcon}/>
                            <StyledLink href='admin/myprofile' style={{fontSize:"14px",color:"#9D9D9D",margin:"0 20px", padding: 0}}>Post a new Job</StyledLink>
                        </span>                                                                                       
                    </div> */}
                    <div onClick={() => history.push('/admin/myprofile')} style={{ padding: '2.5vh 0 1.5vh 0'}}>
                        <span style={{display:"flex"}}>
                            <img src={SuitCaseIcon}/>
                            <StyledLink style={{fontSize:"14px",color:"#9D9D9D",margin:"0 20px", padding: 0}}>View My Profile</StyledLink>
                        </span>                                                                                       
                    </div>
                    <div onClick={() => history.push('/admin/postedjobs') } style={{ padding: '1.5vh 0'}}>
                        <span style={{display:"flex"}}>
                            <img src={SuitCaseIcon}/>
                            <StyledLink style={{fontSize:"14px",color:"#9D9D9D",margin:"0 20px", padding: 0}}>View Posted Jobs</StyledLink>
                        </span>                                                                                       
                    </div>
                    <div onClick={(e) => handleLogout(e)} style={{ padding: '1.5vh 0'}}>
                        <span style={{display:"flex"}}>
                            <img src={LogoutIcon}/>
                            <StyledLink style={{fontSize:"14px",color:"#9D9D9D",margin:"0 20px", padding: 0}}>Logout</StyledLink>
                        </span>                                                                                       
                    </div>
                    </>}                      
                    </DropDownDiv>
                </IconDiv>
            </FlexRowWrapper>
        </FlexRowWrapper>
    )
}

export default Navbar