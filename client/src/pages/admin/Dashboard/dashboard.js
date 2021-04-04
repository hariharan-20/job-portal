import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Row} from 'react-bootstrap'
import { StyledMainContainer, StyledCardRow, StyledMainRowWrapper,  StyledRow, StyledCol, StyledMainColWrapper, StyledColWrapper, BlueButton, RecentJobDiv, PostNewCard, CardDet, CardNo , CardLabel, StyledColWrapperPost, RecentJobHeader, ViewSpan, PostImg, PostLabel, UserCardDiv} from './style'
import Loading from "../../../assets/loading.svg"

import BriefCaseIcon from '../../../assets/dasboardbriefcase.svg'
import SignupTouchIcon from '../../../assets/dasboardtouch.svg'
import UsersIcon from '../../../assets/dasboardusers.svg'
import EmployeeIcon from '../../../assets/dasboardemployee.svg'
import AddNewICon from '../../../assets/dasboardaddnew.svg'

import UserCard from '../../../components/usercard/usercard'
import RecentJobTile from '../recentjobtile/recentjobtile'
import {CircularProgress} from "material-ui-core"

import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { SpinnerDiv } from '../../../components/styledcomponent/styledcomponent'




const Dasboard = () => {
    const history = useHistory()
    const [data, setData] = useState()
    const [loading,setLoading]=useState()
    const getData = async () => {
        setLoading(true)
        axios.get('/api/admin/dashboard')
        .then(res => {
            console.log(res.data)
            setData(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        axios({
            method:"get",
            url:"/api/user/isAuthenticated"
        }).then((res)=>console.log(res,"i am home page"))
        .catch((err)=>{
            console.log(err.message)
            toast.info('Session logged out, please Login in again', {
                position: toast.POSITION.BOTTOM_RIGHT,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,     
                autoClose: 3000               
            })
            history.push({
                pathname:"/signin"
            })
            localStorage.removeItem("userType")
        })
        getData()
    }, [])
    if(loading){
         return (     
         
       
         <SpinnerDiv>
         {/* <CircularProgress color="secondary"  /> */}
         <img className="loader" src={Loading}/>
          </SpinnerDiv>
          )}return(
             <>
            {data && 
            <>

        <StyledMainContainer fluid>
            <StyledMainRowWrapper>            
            <StyledMainColWrapper md={5}>                                    
                        <StyledCardRow>
                            <StyledColWrapper >                                
                                    <StyledRow>
                                        <StyledCol md={3}><img style={{ width: '70px'}} src={BriefCaseIcon}/></StyledCol>                                        
                                        <CardDet>
                                            <CardNo>{data.jobs}</CardNo>
                                            <CardLabel>Job posted</CardLabel>
                                        </CardDet>                                        
                                    </StyledRow>
                            </StyledColWrapper>
                            <StyledColWrapper > 
                                    <StyledRow>
                                        <StyledCol md={3}><img style={{ width: '70px'}} src={UsersIcon}/></StyledCol>                                        
                                        <CardDet>
                                            <CardNo>{data.users}</CardNo>
                                            <CardLabel>No. of Users</CardLabel>
                                        </CardDet>                                        
                                    </StyledRow>                            
                            </StyledColWrapper>
                        </StyledCardRow>
                        <StyledCardRow>
                            <StyledColWrapper >
                                    <StyledRow>
                                        <StyledCol md={3}><img style={{ width: '70px'}} src={SignupTouchIcon}/></StyledCol>                                        
                                        <CardDet>
                                            <CardNo>{data.users}</CardNo>
                                            <CardLabel>No. of users</CardLabel>
                                        </CardDet>                                        
                                    </StyledRow>
                            </StyledColWrapper>
                            <StyledColWrapper >
                                    <StyledRow>
                                        <StyledCol md={3}><img style={{ width: '70px'}} src={EmployeeIcon}/></StyledCol>                                        
                                        <CardDet>
                                            <CardNo>{data.applications}</CardNo>
                                            <CardLabel>No. of applications</CardLabel>
                                        </CardDet>                                        
                                    </StyledRow>
                            </StyledColWrapper>
                        </StyledCardRow>
                        <StyledCardRow>
                            <StyledColWrapperPost md={6}  style={{ padding: 0}}>
                            <PostNewCard onClick={() => history.push('/admin/postnewjob')}>
                                <PostImg src={AddNewICon} />
                                <PostLabel>Post New Job!</PostLabel>
                            </PostNewCard>
                            </StyledColWrapperPost>
                        </StyledCardRow>                                                                                                              
                </StyledMainColWrapper>            
                 
            <StyledMainColWrapper md={4}>                            
                <RecentJobHeader>Recent Job Post
                    <ViewSpan onClick={() => history.push('/admin/postedjobs')}>{'View more >'}</ViewSpan>
                </RecentJobHeader>
                <RecentJobDiv><RecentJobTile data={data.recentjobs}/></RecentJobDiv>
                <BlueButton onClick={() => history.push('/admin/postedjobs')} style={{ borderRadius: '0 0 4px 4px'}}>{'View More >'}</BlueButton>            
            </StyledMainColWrapper>

            <StyledMainColWrapper md={2}>                
                <UserCardDiv><UserCard/></UserCardDiv>
            </StyledMainColWrapper>
            </StyledMainRowWrapper>
        </StyledMainContainer>
        <ToastContainer toastClassName ="toastInfo"/> 
        </>
                                            
        }
        </>
    )
}

export default Dasboard