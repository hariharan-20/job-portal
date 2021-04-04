import React,{ useState, useEffect } from 'react'
import { useHistory,useLocation,NavLink } from 'react-router-dom'
import axios from 'axios'
import "./navbar.css"
import styled from 'styled-components'
import { FlexRowWrapper} from '../styledcomponent/styledcomponent'
import "./navbar.css"
import { logoutUser } from "../../Redux/Features/userSlice"
import { useDispatch } from "react-redux"
import Verzeologo from "../../assets/verzeo logo.svg"
import GuestAvatar from '../../assets/guestavatar.svg'
// import NotificationIcon from '../../assets/navbarnotification.svg'
// import MessageIcon from '../../assets/navbarmessage.svg'
import LogoutIcon from '../../assets/logout.svg'
import DownArrowIcon from '../../assets/downarrow.svg'
import SuitCaseIcon from '../../assets/navbarsuitcase.svg'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

export const BlueButton = styled.button `
    width: 100%;
    padding: 11px 25px;
    border: none;
    border-radius: 4px;
    color: white;
    background: #5471E8;
    font-size: 14px;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    // @media(max-width:500px){
    //     width:50%;
    // }
`
const StyledLink = styled.a`    
    color: #5471E8 !important;    
    font-weight: 500;
    cursor: pointer;
    padding-top: 8%; 
    text-decoration: none !important;
    font-size: 14px;
    margin-right:20px;
    &:focus {
        outline: none
    }
`

const DropDownIcon = styled.img`
    margin-right:5%;
    width:11%;
    margin-bottom: 2%;
    @media(max-width: 500px) {
        width: 13%;
        margin-bottom: 2%;
    }
`

const Navbarres = () =>{
    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)   
    const [img,setImg] =useState()
    const history = useHistory()  
    const [isLoggedIn, setIsLogged] = useState(false)
    const location = useLocation()
    const pathname = window.location.pathname

   
    const userType = localStorage.getItem('userType')   

    useEffect(() => {                 
        if(userType){
            setIsLogged(true) 
            axios({
                method:"get",
                url:"/api/user/allMyDetails"
            }).then((res)=>{            
                if(res.data[3]){
                   
                    if(res.data[3].hasOwnProperty('displayimage')) {
                        res.data[3].displayimage !== null &&
                        setImg(`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(res.data[3].displayimage.data)))}`)                    
                    }
                }
                
            })                      
        }else {
            setIsLogged(false)
        }        
    },[isLoggedIn, userType])
    

    const handleLogout = (e) =>{
        e.preventDefault()
        dispatch(logoutUser())                                
    }
   return(
      
    <Navbar collapseOnSelect expand="lg" bg="white" className="Navbar-container" style={{position: 'fixed', top: 0, width: '100%', padding: 0}}>
    <Navbar.Brand style={{marginLeft: '5%'}} ><img className="nav-img" onClick={() => history.push(userType==='A' ? '/admin/dashboard' : '/')} src={Verzeologo} style={{color: '#2680EB', width: '70%', cursor: 'pointer'}}/>
    <div className="secondnav">
        <div className="fl">
          {userType && 
          <>
          <img src={img ? img : GuestAvatar} style={{ padding: '3px',borderRadius:"50%", width: '40px', height:'40px', objectFit: 'cover'}}/> 
        <NavDropdown className="secondnavDropdown">
       
            {userType === "U" && 
            <>
               <NavDropdown.Item onClick={() => history.push('/myprofile')}><DropDownIcon src={SuitCaseIcon}/>View my profile</NavDropdown.Item>
               <NavDropdown.Item  onClick={() => history.push('/appliedjobs')}><DropDownIcon src={SuitCaseIcon} />View Jobs</NavDropdown.Item>
               <NavDropdown.Item onClick={(e) => handleLogout(e)}> <DropDownIcon src={LogoutIcon} />Logout</NavDropdown.Item>
            </>
            }
            {userType === 'A' && 
             <>
          <NavDropdown.Item onClick={() => history.push('/admin/myprofile')}><DropDownIcon src={SuitCaseIcon} />View my profile</NavDropdown.Item>
          <NavDropdown.Item  onClick={() => history.push('/admin/postedjobs') } ><DropDownIcon src={SuitCaseIcon} />View Posted Jobs</NavDropdown.Item>
          <NavDropdown.Item onClick={(e) => handleLogout(e)} ><DropDownIcon src={LogoutIcon} />Logout</NavDropdown.Item>
            </> }
        </NavDropdown>
  </>
        ||
        <>
        {(window.location.pathname.toLowerCase() !== '/signin' && window.location.pathname.toLowerCase() !== '/signup') &&
            <>
                <StyledLink href="/signIn">Sign In</StyledLink>
                <Nav.Link> <BlueButton onClick={() => history.push('/signUp') }>Register for free</BlueButton></Nav.Link>
            </>
        }
        </>
        }
        </div>
      </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    
        {userType === "A"  ?   
        <Navbar.Collapse id="responsive-navbar-nav-admin" >
            <Nav className="mr-auto">
                <Nav.Link href='/admin/dashboard' className={pathname === '/admin/dashboard' ? 'activeLink' : 'nav-link'}>Dashboard</Nav.Link>
                <Nav.Link href='/admin/postedjobs' className={pathname === '/admin/postedjobs' ? 'activeLink' : 'nav-link'}>Job Posted</Nav.Link>
            </Nav>          
            </Navbar.Collapse>
        :         
        <Navbar.Collapse id="responsive-navbar-nav-user" >
            <Nav className="mr-auto">
                <Nav.Link href="/" className={pathname === '/' ? 'activeLink' : 'nav-link'}>All Jobs</Nav.Link>                
                <Nav.Link href="/govJobs" className={pathname === '/govJobs' ? 'activeLink' : 'nav-link'}>Goverment Jobs</Nav.Link>
                <Nav.Link href="/MassRec" className={pathname === '/MassRec' ? 'activeLink' : 'nav-link'}>Mass Recruiter</Nav.Link>
                <Nav.Link href="/More" className={pathname === '/More' ? 'activeLink' : 'nav-link'}>More</Nav.Link>
            </Nav>            
        </Navbar.Collapse>      
        }             
        
        <Navbar.Collapse aria-controls="responsive-navbar-nav">
      
      <div className="second-nav">
          {userType && 
          <>
          <img src={img ? img : GuestAvatar} style={{ padding: '3px',borderRadius:"50%", width: '40px', height:'40px', objectFit: 'cover'}}/> 
        <NavDropdown  id="collasible-nav-dropdown">
       
            {userType === "U" && 
            <>
               <NavDropdown.Item onClick={() => history.push('/myprofile')}><DropDownIcon src={SuitCaseIcon}/>View my profile</NavDropdown.Item>
               <NavDropdown.Item  onClick={() => history.push('/appliedjobs')}><DropDownIcon src={SuitCaseIcon} />View Jobs</NavDropdown.Item>
               <NavDropdown.Item onClick={(e) => handleLogout(e)}> <DropDownIcon src={LogoutIcon} />Logout</NavDropdown.Item>
            </>
            }
            {userType === 'A' && 
             <>
          <NavDropdown.Item onClick={() => history.push('/admin/myprofile')}><DropDownIcon src={SuitCaseIcon} />View my profile</NavDropdown.Item>
          <NavDropdown.Item  onClick={() => history.push('/admin/postedjobs') } >  <DropDownIcon src={SuitCaseIcon} />View Posted Jobs</NavDropdown.Item>
          <NavDropdown.Item onClick={(e) => handleLogout(e)} ><DropDownIcon src={LogoutIcon} />Logout</NavDropdown.Item>
            </> }
        </NavDropdown>
  </>
        ||
        <>
        {(window.location.pathname.toLowerCase() !== '/signin' && window.location.pathname.toLowerCase() !== '/signup') &&
            <>
                <StyledLink href="/signIn">Sign In</StyledLink>
                <Nav.Link> <BlueButton onClick={() => history.push('/signUp') }>Register for free</BlueButton></Nav.Link>
            </>
        }
        </>
        }
      </div>
    </Navbar.Collapse>
  </Navbar>
   ) 
}

export default Navbarres