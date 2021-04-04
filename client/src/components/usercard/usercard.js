import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import "./usercard.css"
import GuestAvatar from '../../assets/guestavatar.svg'
import { StyledContainer, StyledRow, StyledCol, TransparentButton,} from './style'
import {fetchUser, selectUser } from "../../../src/Redux/Features/userSlice"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
const ImageDiv = styled.div`
    background-color: #0000001F;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    padding: 0% 0%;
    margin-right: 5%;
    margin: 4% auto;       
  `

  const Image = styled.img`
    height: 75px;
    width: 75px;    
    border-radius: 50px;
    object-fit: contain
    background-color: #ACACAC;        
`
const UserCard = () => {
    const [userType,setUsertype] = useState()     
    const history = useHistory()
    const [img,setImg] =useState()
    const [profilePercent, setProfilePercent] = useState()
    const user = useSelector(selectUser)      

    useEffect(()=>{
        setUsertype(localStorage.getItem('userType'))
        // if(userType){
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
                if(res.data[4]) {
                    setProfilePercent(`${res.data[4].profilePercentage}%`)
                }
            })
        // }
    },[img, profilePercent])

    const handleClick = (e, profilePercent) =>{    
        e.preventDefault()        
        
        if(userType === 'U'){
            if(profilePercent === '100%') {
                history.push('/myprofile')
            } else {
                history.push('/profileupdate')
            }
        } 
        if(userType === 'A'){
            if(profilePercent === '100%') {
                history.push('/admin/myprofile')
            } else {
                history.push('/admin/profileupdate')
            }
        } 
    }
        
    return (        
        <StyledContainer>            
            {userType === 'U' &&                     
                // <StyledRow>
                //     <StyledCol><div style={{, width: '80%', textAlign: 'start',marginBottom:"10px"}}>Your profile update</div></StyledCol>
                //     <StyledCol><div style={{color: '#005DBC'}}>{profilePercent}</div></StyledCol>
                // </StyledRow>
                <>
                <ImageDiv style={{ width: '75px', height: '75px'}}>            
                    {img ? <Image src={img} /> : <Image src={GuestAvatar} />}
                </ImageDiv>
                <div className="user-container">
                     <p style={{color: '#A7A7A7'}}>Your profile update</p>
                     <p style={{color: '#005DBC', fontWeight: 500,}}>{profilePercent}</p>
                </div>
                <div style={{ backgroundColor:'#0000001F', borderRadius: '4px',margin:'2% 10%'}}>
                        <div style={{ width: `${profilePercent}`, backgroundColor: '#5471E8', height: '5px', borderRadius: '4px'}}></div>
                    </div>  
                    <TransparentButton onClick={(e) => handleClick(e, profilePercent)} >{profilePercent === '100%' ? 'View Profile' : 'Update your profile'}</TransparentButton>
                </>
            }
            <StyledRow>
                {userType === 'A' &&                 
                <>
                    <ImageDiv style={{ width: '75px', height: '75px',marginLeft:"0 auto"}}>            
                        <Image src={ img ? img : GuestAvatar} />
                    </ImageDiv>
                    <div style={{ color: '#5471E8',  fontSize: '20px', textAlign: 'center'}}>Welcome Admin!</div>
                </>
                    // <div style={{ width: '100%', backgroundColor:'#0000001F', borderRadius: '4px'}}>
                    //     <div style={{ width: `${profilePercent}`, backgroundColor: 'blue', height: '5px', borderRadius: '4px'}}></div>
                    // </div>                                
                }                
            </StyledRow>
            {/* { userType === ' U' &&    
                <>        
                    <StyledRow>{profilePercent === '100%' ? 'View Profile' : 'Update your profile'}</StyledRow>
                    <TransparentButton onClick={(e) => handleClick(e, profilePercent)} ></TransparentButton>
                </>
            } */}
        </StyledContainer>
    )
}
export default UserCard