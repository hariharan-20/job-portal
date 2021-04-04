import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import {CircularProgress} from "material-ui-core"
import Loading from "../../../assets/loading.svg"
import { SpinnerDiv, TransparentButton} from '../../../components/styledcomponent/styledcomponent'
import "./myprofile.css"
import LocationIcon from '../../../assets/myproflocation.svg'
import EmailIcon from '../../../assets/myprofemail.svg'
import PhoneIcon from '../../../assets/myprofphone.svg'
import ProfBg from '../../../assets/myprofilebg.svg'
import EditIcon from '../../../assets/myprofedit.svg'
import DefaultJobIcon from '../../../assets/defaultjob.svg'
// import { useStore } from 'react-redux'
import AvatarIcon from '../../../assets/guestavatar.svg'
import { job } from '../../../Redux/Features/profileSlice'

const StyledLable = styled.label`
    font-size: 15px;
    color: #2B2B2B;
    font-weight: 500;
    margin-bottom:0;
    // text-transform: capitalize;
`

const FlexRowWrapper = styled.div `
    display:flex;
    flexDirection: row;
    width:${props => props.width};
    @media(max-width:500px){
        flex-direction:${props => props.flexDirection};
        align-items:${props => props.alignItems};
        margin-left:${props => props.marginLeft};        
        align-items: center;        
    }        
`
const Wrapper = styled.div`
    background-color: #FFFFFF;    
    padding: 2% 1%;
    border: 1px solid #0000001F;
    border-radius: 4px;
    @media(max-width:500px){
        padding: 5%;
        border:none;    
    }
`
const AvatarDiv = styled.div`    
    color: #535353;
    background-color: #0000001F;
    margin: 0 6% 20px 2%;    
    background-color: #0000001F;
    border-radius: 50px;
    width: 100px;
    height: 100px;
    padding: 0;    
    @media(max-width:500px){        
        margin-bottom: 8px;
    }
`

const DetailImgDiv = styled(AvatarDiv)`
    width: 75px;
    height: 75px;
    margin: '0px 2.5% 0 1.5%';
    border-radius: 8px;
    @media(max-width: 500px){
        margin-top: ${props => props.marginTop};
        height: 75px; 
        width: 75px;
        margin: '0px 11.5% 0 1.5%';
    }
`

const PersonalResDiv =styled.div`
display: flex;
justify-content: space-between;
width: 20rem;
    @media(max-width: 500px){
    }
`

const EditIconDiv = styled.div`
    height: max-content
    textAlign: end;
    cursor: pointer;
    display: block;
    @media(max-width: 500px){
        padding-left: 19rem;        
        display: none
    }
`
const EditIconImg = styled.img`
    width: 28px;
    @media(max-width: 500px){
        margin: 0;        
    }
`

const AvtarImg = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50px;
`

const EditIconDivResponsive = styled(EditIconDiv)`
    display: none;
    @media(max-width: 500px){
        display: block;
    }
`


const MyProfile = () => {
    const history = useHistory()
    const [loading,setLoading] =useState()
    const [userType] = localStorage.getItem('userType')
    const [userDetail, setUserDetail] = useState()
    const [personalDet, setPersonalDet] = useState()
    const [educationDet, setEducationDet] = useState()
    const [jobDet, setJobDet] = useState()
    const [img, setImg] = useState()
    const [viewJob, setViewJob] = useState(true)
    const [viewEdu, setViewEdu] = useState(false)
    const [months] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'])

    const onClickViewJob = () => {
        setViewEdu(false)
        setViewJob(true)
    }

    const onClickViewEdu = () => {
        setViewJob(false)
        setViewEdu(true)
    }

    const editClick = () => {

        userType === 'U' && history.push('/profileupdate')
        userType === 'A' && history.push('/admin/profileupdate')
    }

    const getMonth = (value) => {
        return months[parseInt(value)-1]
    }

    useEffect(() => {        
        setLoading(true)
        axios.get('/api/user/allMyDetails')
            .then(res => {
                             
                // setData(res.data)
                setUserDetail(res.data[0])
                setPersonalDet(res.data[3])
                setEducationDet(res.data[1])
                setJobDet(res.data[2])
                {res.data[3].displayimage && setImg(`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(res.data[3].displayimage.data)))}`)}
                setLoading(false)  
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])
    if(loading){
        return (     
        
        <SpinnerDiv>
            {/* <CircularProgress color="secondary"  /> */}
            <img className="loader" src={Loading}/>
         </SpinnerDiv>
         )}
    return (
        <div className="mob-view">

            <Wrapper className="profile-containers" style={{
                backgroundImage: `url(${ProfBg})`,
                
                }}>
                <FlexRowWrapper flexDirection={'column'}>
                    <EditIconDivResponsive onClick={editClick}>
                        <EditIconImg src={EditIcon} />
                    </EditIconDivResponsive>
                    <AvatarDiv  className="profileimg-container"><AvtarImg src={img ? img : AvatarIcon} /></AvatarDiv>
                    <div  className="pro-containerone">
                        <FlexRowWrapper flexDirection={'column'}>
                            {userDetail && <h2>{userDetail.name}</h2>}
                            {jobDet && jobDet.currentdesignation && <h2>{'(' + jobDet.currentdesignation + ')'}</h2>}
                        </FlexRowWrapper>
                        <FlexRowWrapper  className="profiledetails" flexDirection={'column'} >
                            {userDetail &&
                                <FlexRowWrapper>
                                    <img  src={EmailIcon} />
                                    <StyledLable>{userDetail.email}</StyledLable>
                                </FlexRowWrapper>
                            }
                            <PersonalResDiv>

                            {personalDet &&
                                <FlexRowWrapper marginLeft={'25px'}>
                                    <img  style={{width: '15px'}} src={LocationIcon} />
                                    <StyledLable>{personalDet.location !== null ? personalDet.location : 'location not mentioned'}</StyledLable>
                                </FlexRowWrapper>
                            }
                            {userDetail &&
                                <FlexRowWrapper >
                                    <img  src={PhoneIcon} />
                                    <StyledLable>{userDetail.phone !== null ? userDetail.phone : 'phone number not mentioned'}</StyledLable>
                                </FlexRowWrapper>
                            }
                            </PersonalResDiv>
                            
                            
                        </FlexRowWrapper>
                    </div>
                    <EditIconDiv onClick={editClick}>
                        <EditIconImg src={EditIcon} />
                    </EditIconDiv>
                </FlexRowWrapper>
            </Wrapper>
            {(jobDet && educationDet) &&
         

                <Wrapper style={{ padding: '1%', margin: '1% 5%' }}>
                    {/* <FlexRowWrapper style={{ marginBottom: '3%', justifyContent: 'space-between' }}>
                        <FlexRowWrapper style={{background:"#F2F2F2" }} width={'35%'}>
                            <TransparentButton style={{
                                width: '49%',
                                height:"3rem",
                                backgroundColor: viewJob ? '#5471E8' : '#FFFFFF',
                                color: viewJob ? '#FFFFFF' : '#3E3E3E',
                                borderColor: viewJob ? '#5471E8' : 'white'
                            }}
                                onClick={onClickViewJob}
                            >Job Details</TransparentButton>
                            <TransparentButton style={{
                                width: '49%',
                                height:"3rem",
                                marginLeft:"5px",
                                backgroundColor: viewEdu ? '#5471E8' : '#FFFFFF',
                                color: viewEdu ? '#FFFFFF' : '#3E3E3E',
                                borderColor: viewEdu ? '#5471E8' : 'white'
                            }}
                                onClick={onClickViewEdu}
                            >Educational Details</TransparentButton>
                        </FlexRowWrapper>                        
                    </FlexRowWrapper> */}
                    {/* {viewJob && */}
                        <div style={{ fontWeight: 600, fontSize: 'margin', fontSize: '20px', margin: '10px 0'}}>Job Details</div>
                        {console.log(jobDet)}
                        {(!jobDet.companyname &&
                             !jobDet.endyear &&
                              !job.startyear &&
                               !jobDet.workdescription &&
                                !jobDet.currentdesignation) ?
                                <div style={{ padding: '2% 0', textAlign: 'center' }}>No Records to show</div> :
                                <FlexRowWrapper>
                            <DetailImgDiv >
                                <img src={DefaultJobIcon}/>
                            </DetailImgDiv>
                            <div style={{ width: '65%', paddingLeft: '15px' }}>
                                {jobDet.currentdesignation && <div><label style={{ fontSize: '18px', fontWeight: 600, color: '#0B0606' }}>{jobDet.currentdesignation}</label></div>}
                                <div style={{ marginBottom: '1%' }}>
                                    {jobDet.companyname && <div><StyledLable style={{color:"#5471E8"}}>{jobDet.companyname}</StyledLable></div>}
                                    {jobDet.startyear && <div style={{marginTop:"10px"}}><StyledLable >{getMonth(jobDet.startmonth)+' '+jobDet.startyear +' - '+(jobDet.endyear ? getMonth(jobDet.endmonth)+' '+ jobDet.endyear : 'present')}</StyledLable></div>}
                                    {/* <div style={{marginTop:"10px"}}><StyledLable >Location</StyledLable></div> */}
                                </div>
                                <div style={{ marginBottom: '1%' }}>
                                    {jobDet.workdescription && 
                                        <>
                                        <StyledLable>Description</StyledLable>
                                        <div>
                                            <label style={{ color: '#535353', fontSize: '13px' }}>{jobDet.workdescription}</label>
                                        </div>
                                        </>
                                    }
                                </div>
                                {/* <div style={{ marginBottom: '1%' }}>
                                    <StyledLable>Skill</StyledLable>
                                    <div></div>
                                </div> */}
                            </div>
                        </FlexRowWrapper>   
                            }                                             
                        <div style={{ fontWeight: 600, fontSize: 'margin', fontSize: '20px', margin: '10px 0'}}>Educational Details</div>
                        { (educationDet.school === null && 
                            educationDet.degree === null &&
                             educationDet.passingyear === null &&
                              educationDet.location === null &&
                               educationDet.fieldOfStudy === null) ? 
                            <div style={{ padding: '2% 0', textAlign: 'center' }}>No records to show</div> :
                            <FlexRowWrapper>
                                <DetailImgDiv marginTop = '-0.5rem'><img src={DefaultJobIcon}/></DetailImgDiv>
                                <div style={{ paddingLeft: '15px'}}>
                                    {educationDet.school && <div style={{ marginBottom: '1%' }}><label style={{ fontSize: '18px', fontWeight: 600, color: '#0B0606' }}>{educationDet.school}</label></div>}
                                    <div>
                                        {educationDet.degree && <div><StyledLable>{educationDet.degree}</StyledLable></div>}
                                        {educationDet.passingyear && <div><StyledLable>{educationDet.passingyear}</StyledLable></div>}
                                        {educationDet.location && <div><StyledLable>{educationDet.location}</StyledLable></div>}
                                    </div>
                                </div>
                            </FlexRowWrapper>
                        }
                                                
                </Wrapper>
            }
            {/* </>} */}
        </div>
    )
}

export default MyProfile