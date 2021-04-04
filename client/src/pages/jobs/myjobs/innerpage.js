import axios from 'axios'
import styled from 'styled-components'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { BlueButton, SpinnerDiv, Wrapper } from '../../../components/styledcomponent/styledcomponent'
import {CircularProgress} from "material-ui-core"
import Loading from "../../../assets/loading.svg"
import {modalView,change} from "../../../Redux/Features/modals"
import AvatarIcon from '../../../assets/guestavatar.svg'
import ExpierienceIcon from '../../../assets/experienceicon.svg'
import LocationIcon from '../../../assets/locationicon.svg'
import SaveIcon from '../../../assets/greyicon.svg'
import SavedIcon from '../../../assets/saveicon.svg'
import DefaultJobIcon from '../../../assets/defaultjob.svg'
import {useSelector,useDispatch} from "react-redux"
import Addjob from '../../../components/job/Addjob'
import "./innerpage.css"

const SaveButton = styled.button`    
    width: 80%;
    display: flex;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    font-size: 14px;  
    padding: 0 5%;  
    &:focus {
        outline: none;
    }
    @media(max-width: 500px){
        padding: 1% 2%;
    }
`
const RecentJobDiv = styled.div`
    overflow-y: scroll;
    height: 10vh;
    ::-webkit-scrollbar {
        width: 5px;
    }            
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
            
    ::-webkit-scrollbar-thumb {
        background: #5471E8; 
        border-radius: 10px;
    }
    @media(max-width:500px){
        display:none;
    }
`
const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    margin: 6% 5% 1% 5%;
    flex-direction: row;       
    @media(max-width: 500px){
        margin: 23% 5% 1% 5%;
    } 
`

const Bluebutton = styled(BlueButton)`
    padding: 5%;
    width: 110px;
    border-radius: 4px;
    @media(max-width: 500px) {        
        width: 8rem;
        padding: 1.5%;
    }
`
const BtnDiv = styled(FlexRowWrapper)`
flex-direction: column;
text-align: end;
justify-content:space-between;
align-items: flex-end;
margin:10px;
font-weight: 500;
@media(max-width: 500px) {
    flex-direction: row-reverse;
}
`

const InnerPage = () => {
    const history = useHistory()
    const location = useLocation()    
    const [data, setData] = useState()
    const [datas,setDatas]=useState()
    const [loading,setLoading]=useState()
    const [userType,setUsertype] = useState()
    const [value,setValue]=useState()
    const [isSaved, setIsSaved] = useState()
    const dispatch = useDispatch()
    
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',         
        minimumFractionDigits: 0, 
    })    

    const calculateDay = (value) => {
        const today = new Date().getDate()
        const month = new Date().getMonth()+1
        const postedDay = new Date(value).getDate()
        const postedMonth = new Date(value).getMonth()+1
        let res = 0
        if(month === postedMonth) {
            return today - postedDay
        } else {
            if((month-1) % 2 === 0){
                res = today+30 - postedDay
            } else if((month-1) === 2) {
                res = today+29 - postedDay
            } else {
                res = today+31 - postedDay
            }
        }
        if(res>30) {
            return 'A month ago'
        } else {
            return res
        }
    }
    
    const imgConvert = (value) => {                        
        const buff = Buffer (value, 'base64')
        const result = buff.toString('base64')                
        return result
    }

    const getRecentJob = async (id = location.state.ele._id) => {
        setLoading(true)
        await axios.get('/api/job/wfall')
        .then(res => {           
            let data = res.data
            data = data.filter(ele => {
                return ele._id !== id
            })            
            setDatas(data)
            setLoading(false)            
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const getJobDetail = async() => {
        await axios.post('/api/job/getJobDetails', {id: location.state.ele._id})
        .then( res => {        
            setData(res.data)
            console.log(res.data)
            setIsSaved(location.state.ele.isSaved)                        
        })
        .catch(err => {
            console.log(err.message)
        })
        getRecentJob()
    }
    
    useEffect(() => {     
        setUsertype(localStorage.getItem('userType')) 

        setLoading(true)
        getJobDetail()             
    }, [])
    

    const handleApply = (e, ele) => {                        
        if (userType) {
            if (ele) {
                dispatch(change(true))
                setValue(ele)
            }
        } else {
            history.push({
                pathname: "/signin",
                state: {
                    message: "For applying jobs, Please Sign In first"
                }
            })
        }

    }
    const handleClick = (ele) =>{
        getRecentJob(ele._id)
        setData(ele)
    }

    const handleSaveButton = (ele, i) => {        
        if(userType) {
            axios.post('/api/user/save-job', { id: ele._id })
            .then(res => {
                if (res.status === 200) {
                    console.log(res)                            
                    setIsSaved(true)                            
                }
            })
            .catch(err => {
                axios.delete(`/api/user/delete-saved-job/${ele._id}`)
                .then(res => {                                                                                    
                    console.log(res)
                    setIsSaved(false)
                })
                .catch( err => {
                    console.log(err.message)
                })
            })
        } else {
            history.push({
                pathname: "/signin",
                state: {
                    message: "For Saving the jobs, Please Sign In first"
                }
            })
        }
    }

    if(loading){
        return(
            <SpinnerDiv >
                 {/* <CircularProgress color="secondary"/> */}
                 <img className="loader" src={Loading}/>
            </SpinnerDiv>
        ) 
    } else{
        return (
            <>
            {console.log(data)}
            {data && 
            <>
            {console.log(data)}
            <FlexRowWrapper style={{  justifyContent: 'space-between' }}>
                <div  className="inner-container">
                    <div className="inner-two">
                        <div >
                            <FlexRowWrapper style={{ margin: '1% 0'}}>
                                <div style={{ marginRight: '2%',width:'100px'}}>
                                <img  style={{  width: '80px', objectFit: 'contain', borderRadius: '10px'}} src={data.companylogo ? `data:image/png;base64,${imgConvert(data.companylogo)}` : DefaultJobIcon}/>
                                </div>
                                <div>
                                    <div style={{ color: '#2680EB', fontWeight: 600, textTransform: 'capitalize', fontSize: '18px',marginTop:"10px"}}>{data.companyname}</div>
                                    <div style={{ color: '#535353', fontSize: '16px',fontWeight: 500, textTransform: 'capitalize',marginTop:"3px"}}>{data.title}</div>
                                </div>
                            </FlexRowWrapper>
                            <FlexRowWrapper style={{ margin: '10px 0px 10px 10px', fontWeight: 500, flexDirection: 'row'}}><img style={{ width: '15px', marginRight: '6px' , marginBottom: '4px' }}src={ExpierienceIcon} /><div style={{ color: '#535353', fontSize: '13px'}}>
                                {data.minexperience+' - '+data.maxexperience+' Years of Experience'}    
                            </div></FlexRowWrapper>
                            <FlexRowWrapper style={{ margin: '10px 0px 10px 10px', fontWeight: 500, flexDirection: 'row'}}><img style={{ width: '18px', marginRight: '6px' , marginBottom: '4px', marginLeft: '-2px' }}src={LocationIcon} /><div style={{ color: '#535353', fontSize: '13px'}}>{data.location}</div></FlexRowWrapper>
                            <div style={{ color: '#535353', fontSize: '13px', margin: '10px 0px 10px 10px', fontWeight: 500}}>{formatter.format(data.minsalary)+' - '+formatter.format(data.maxsalary)+' P.A.'}</div>
                            <div style={{ color: '#BAB7B7', fontSize: '13px', margin: '10px 0px 10px 10px', fontWeight: 500}}>{calculateDay(data.createdAt) <= 1 ? 'Recently Added' : calculateDay(data.createdAt)+' Days Ago'}</div>
                        </div>       
                        {userType !== 'A' &&
                            <BtnDiv className="BtnDiv">
                                <SaveButton onClick= {() => handleSaveButton(data)} style={{ width: '65px',}}><span style={{ display: 'flex' }}>{data.isSaved ? 'Saved' : 'Save'}
                                    <img style={{ width: '20px'}} src={data.isSaved ? SavedIcon : SaveIcon} /></span></SaveButton>
                                <Bluebutton onClick={(e) => handleApply(e, data)} >Apply now</Bluebutton>
                            </BtnDiv>
                        }                                                     
                    </div>                
                    <div style={{ color: '#3C3C3C', fontSize: '17px', fontWeight: 500, margin: '1% 0'}}>{'Job Description'}</div>
                    <div style={{ color: '#4D4D4D', fontSize: '14px', width: '75%',letterSpacing:"1px",lineHeight:"25px", margin: '1% 25px'}}>{data.description}</div>                                
                    <div style={{ color: '#3C3C3C', fontSize: '17px', fontWeight: 500, margin: '1% 0'}}>{'Job Type'}</div>
                    <div style={{ color: '#4D4D4D', fontSize: '14px', width: '60%', margin: '1% 25px'}}>{data.jobType}</div>
                    <div style={{ color: '#3C3C3C', fontSize: '17px', fontWeight: 500, margin: '1% 0'}}>{'Skills Required'}</div>                
                    <div style={{ color: '#4D4D4D', fontSize: '14px', width: '60%', margin: '1% 25px',display:"flex",flexDirection:"row"}}>
                        {data.skills.map((skill, i) => {
                        return (
                            <div className="thumbnail">
                                    <p key={i} style={{textAlign:"center"}}>{skill}</p>
                            </div>
                        )
                    })}</div>
                </div>
                <div  className="relavant-div">
                <BlueButton style={{ cursor: 'default', borderRadius: '4px 4px 0 0', marginTop: '-1px',fontSize:'15px',textAlign:"inherit"}}>Relevant Jobs</BlueButton>
                <RecentJobDiv style={{height:"100vh"}}>
                    <>
                    {loading &&
                        <>
                            <SpinnerDiv >
                                 <CircularProgress color="secondary"/>
                            </SpinnerDiv>
                        </>
                    }
                    </>                
                {datas && datas.map((ele) => {
                    return(      
                        <Wrapper style={{ width: '100%', padding: 0,cursor:"pointer"}} onClick={(e)=>handleClick(ele,e)}>                   
                        <Wrapper style={{ padding: '2% 5%'}}>                
                            <div>
                                <FlexRowWrapper style={{ margin: '2% 0'}}>
                                    <div style={{ marginRight: '2%',width:"60px"}}>
                                    <img  style={{  width: '50px', objectFit: 'contain', borderRadius: '10px'}} src={ele.companylogo ? `data:image/png;base64,${imgConvert(ele.companylogo)}` : DefaultJobIcon}/>
                                    </div>
                                    <div>
                                        <div style={{ color: '#575757', fontWeight: 600, textTransform: 'capitalize', fontSize: '18px'}}>{ele.companyname}</div>
                                        <div style={{ color: '#2680EB', fontSize: '16px',fontWeight: 500, textTransform: 'capitalize'}}>{ele.title}</div>
                                    </div>
                                </FlexRowWrapper>                            
                              <FlexRowWrapper style={{ marginTop: '20px',marginLeft:"10px", fontWeight: 500}}><img style={{ width: '15px', marginRight: '6px' , marginBottom: '4px' }}src={ExpierienceIcon} /><div style={{ color: '#535353', fontSize: '13px'}}>
                                {ele.minexperience+' - '+ele.maxexperience+'Years of Experience'}    
                            </div></FlexRowWrapper>
                            <FlexRowWrapper style={{ margin: '10px 0px 10px 10px', fontWeight: 500}}><img style={{ width: '18px', marginRight: '6px' , marginBottom: '4px', marginLeft: '-2px' }}src={LocationIcon} /><div style={{ color: '#535353', fontSize: '13px'}}>{ele.location}</div></FlexRowWrapper>
                            <div style={{ color: '#535353', fontSize: '13px',fontWeight: 300, margin: '10px 0px 10px 10px', fontWeight: 500}}>{formatter.format(ele.minsalary)+' - '+formatter.format(ele.maxsalary)+' P.A.'}</div>
                            <div style={{ color: '#BAB7B7', fontSize: '13px',fontWeight: 300, margin: '10px 0px 10px 10px', fontWeight: 500}}>{calculateDay(ele.createdAt) <= 1 ? 'Recently Added' : calculateDay(ele.createdAt)+' Days Ago'}</div>
                        </div>
                        </Wrapper>            
                    </Wrapper>               
                    )
                })}
                </RecentJobDiv>
             </div>
            </FlexRowWrapper>   
            <Addjob data={value} />  
            </>                
            }   
            </>
        )
    }
    
}

export default InnerPage