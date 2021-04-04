import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "./appliedjobs.css"
import { CircularProgress } from "material-ui-core"
import ExpierienceIcon from '../../assets/experienceicon.svg'
import LocationIcon from '../../assets/locationicon.svg'
import AvatarIcon from '../../assets/guestavatar.svg'
import { AvatarDiv , SpinnerDiv, TransparentButton } from '../../components/styledcomponent/styledcomponent'
import SavedJobs from '../savedjobs/savedjobs'
import DefaultJobIcon from '../../assets/defaultjob.svg'
import { useHistory } from 'react-router'
import Loading from "../../assets/loading.svg"
const DivTile = styled.div`        
    height: 180px;    
    borderRadius: 4px;
    display: flex;    
    border-radius: -4px;
    border-left: 3px solid #FFFFFF;
    background-color: ${props => props.background};
    &:hover{
        background-color: #D6DEFF48;         
        border-color: #5471E8;
    }
    
`
export const FlexRowWrapper = styled.div`
    display:flex;
    flexDirection: row;    
    width:${props => props.width};

    @media(max-width:500px){
        width:100%; 
        
    }       
`
export const Wrapper = styled.div`
    background-color: #FFFFFF;    
    // padding:${props => props.padding};
    border: 1px solid #0000001F;
    border-radius: 4px;
    margin: 5% 5% 1% 5%;
    @media(max-width: 500px){        
        margin: 20% 5% 1% 5%;
    }
`

const AppliedJobs = () => {
    const history = useHistory()
    const [data, setData] = useState()
    const [loading, setLoading] = useState()
    const [viewJob, setViewJob] = useState(true)
    const [viewSav, setViewSav] = useState(false)

    const onClickViewSav = () => {
        setViewJob(false)
        setViewSav(true)
    }
    const onClickViewJob = () => {
        setViewSav(false)
        setViewJob(true)
    }

    const handleViewJob = (ele) =>{
        history.push({
            pathname: '/viewjob',
            state: {
                ele: ele
            }
        })
    }
    useEffect(() => {
        setLoading(true)
        axios.get('/api/job/get-my-applications')
            .then(res => {
                console.log(res.data)
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])

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
        const buff = Buffer(value, 'base64')
        const result = buff.toString('base64')
        return result
    }

    if(loading){
        return (                   
        <SpinnerDiv>
        {/* <CircularProgress color="secondary"  /> */}
        <img className="loader" src={Loading}/>
        </SpinnerDiv>
    )}
    return (
        <Wrapper >
            <FlexRowWrapper style={{ marginBottom: '1%', justifyContent: 'space-between' }}>
                        <FlexRowWrapper style={{margin:"2% 1%", background: '#F2F2F2', borderRadius: '4px', padding: '10px',justifyContent: 'space-between'}} width={'35%'}>
                            <TransparentButton style={{
                                width: '49%',
                                height:"3rem",
                                backgroundColor: viewJob ? '#5471E8' : '#FFFFFF',
                                color: viewJob ? '#FFFFFF' : '#3E3E3E',
                                borderColor: viewJob ? '#5471E8' : 'white'
                            }}
                                onClick={onClickViewJob}
                            >Applied Jobs</TransparentButton>
                            <TransparentButton style={{
                                width: '49%',
                                height:"3rem",
                                backgroundColor: viewSav ? '#5471E8' : '#FFFFFF',
                                color: viewSav ? '#FFFFFF' : '#3E3E3E',
                                borderColor: viewSav ? '#5471E8' : 'white'
                            }}
                                onClick={onClickViewSav}
                            >Saved Jobs</TransparentButton>
                        </FlexRowWrapper>
                        {/* {loading &&
                            <div style={{textAlign:"center", marginTop: '5%'}}>
                                <CircularProgress color="secondary"  />
                            </div>
                        } */}
                        
                    </FlexRowWrapper>
            
                   {viewJob && 
                   <>
                      {data && data.length > 0 ?
                       data.map((ele, i) => {  
                    
                    return (  
                                         
                       <DivTile onClick={() => handleViewJob(ele)} key={i} background={i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'} style={{borderTop:"1px  #707070"}}>                        

                        <FlexRowWrapper style={{ flexDirection: 'column', padding: '1%', width: '100%' }}>
                            
                                <FlexRowWrapper style={{  padding: '1% 0',height:"100px"}} >
                                    <div style={{  padding: '1%' }}>
                                        <div style={{height:"100px",width:"100px",borderRadius:"50%",}}>
                                            <img  style={{ width: '80px', objectFit: 'contain', borderRadius: '10px'}} src={ele.companylogo ? `data:image/png;base64,${imgConvert(ele.companylogo.data)}` : DefaultJobIcon}/>
                                        </div>                                    
                                    </div>
                                    <div style={{ width : '95%',marginTop:"2%"}}>
                                        <div style={{ color:'#5471E8', fontSize: '18px', fontWeight: 600, margin: '5px 0'}}>{ele.jobid.companyname}</div>
                                        <div style={{ color: '#535353', fontSize: '15px', fontWeight: 500, margin: '5px 0'}}>{ele.jobid.title.toUpperCase()}</div>                                        
                                    </div>
                                </FlexRowWrapper>   
                                <div className="app-container">
                                    <div className="savone">
                                        <img style={{ height: '17px', width: '17px', marginRight: '1px', marginBottom: '-3px' }} src={LocationIcon} />
                                        {ele.jobid.location}
                                    </div>
                                    <div  className="savcontainer">
                                        <img style={{ height: '10px', marginRight: '5px' }} src={ExpierienceIcon} />
                                        {ele.jobid.minexperience+'-'+ele.jobid.maxexperience+' Years of Experience'}
                                    </div>
                                    <div  className="savetwo">{`${formatter.format(ele.jobid.minsalary)} - ${formatter.format(ele.jobid.maxsalary)} P.A.`}</div>
                                    <div  className="savethree">{'Applied on ' + `${Date(`${ele.jobid.createdAt}`).toString().slice(4, 16)}`}</div>                        
                                </div>                                        
                                <div  className="savefour">{calculateDay(ele.createdAt) <= 1 ? 'Recently Added' : calculateDay(ele.createdAt) + ' Days Ago'}</div>
                        </FlexRowWrapper>
                    </DivTile>
                )
            })
            :
            <div style={{ padding: '2% 0', textAlign: 'center' }}>No Applied Jobs</div>    
            } </>  }
            {viewSav && 
               <><SavedJobs/></>
            }


        </Wrapper>
    )
}

export default AppliedJobs