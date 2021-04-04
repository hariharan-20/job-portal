import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {  TransparentButton, Wrapper } from '../../components/styledcomponent/styledcomponent'
import {CircularProgress} from "material-ui-core"
import {useSelector,useDispatch} from "react-redux"
import {modalView,change} from "../../Redux/Features/modals"
import DefaultJobIcon from '../../assets/defaultjob.svg'
import ExpierienceIcon from '../../assets/experienceicon.svg'
import LocationIcon from '../../assets/locationicon.svg'
import AvatarIcon from '../../assets/guestavatar.svg'
import Addjob from '../../components/job/Addjob'
import "./savedjobs.css"
import Loading from "../../assets/loading.svg"

const DivTile = styled.div`    
    
    height: 180px;
    border-radius: -4px;
    border-left: 3px solid #FFFFFF;
    borderRadius: 4px;
    display: flex;    
    background-color: ${props => props.background};
    &:hover{
        background-color: #D6DEFF48; 
        border-color: #5471E8;
        ${TransparentButton}: {
            background-color: #5471E8;
        }
    }    
`
const ApplyTransparentButton = styled(TransparentButton)`     
    ${DivTile}:hover &{    
        color: #FFFFFF;
        border-color: transparent;
        background: #5471EB;
    }
`
const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    flex-direction: row;           
`
// const Indicator = styled.div`
//     background: #5471EB;
//     border-radius: 4px;
//     border: 1.5px solid #5471E8;
//     opacity: 1;        
//     display: none;
//     ${DivTile}:hover &{
//         display: block;
//     }
// `


const SavedJobs = () => {
    const dispatch = useDispatch()
    const [value,setValue]=useState()
    const [data, setData] = useState()
    const [loading,setLoading] =useState()
    const getData = async() => await axios.get('/api/user/get-saved-job')
        .then(res => {            
            setData(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
        })

    useEffect(() => {
        setLoading(true)
        getData()
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
        const buff = Buffer (value, 'base64')
        const result = buff.toString('base64')                
        return result
    }
    const handleApply = (e, ele) => {
        dispatch(change(true))
        setValue(ele)
    }

    const handleRemove = (e, ele) => {
        axios.delete(`/api/user/delete-saved-job/${ele._id}`)
        .then(res => {
            console.log(res)
            // window.alert('saved job removed')
            getData()
        })
        .catch( err => {
            console.log(err.message)
        })
    }
    if(loading){
        return (     
        
      
        <div style={{textAlign:"center"}}>
        {/* <CircularProgress color="secondary"  /> */}
        <img className="loader" src={Loading}/>
         </div>
         )}

    return (
        // <Wrapper style={{ padding: 0}}>    
        <>    
        {data && data.length > 0 ?
            data.map((ele, i) => {
            return (
                <DivTile key={i} background={i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}>
                        {/* <Indicator ></Indicator>                         */}
                        <FlexRowWrapper style={{ flexDirection: 'column', margin: '1%', width: '100%' }}>
                    <FlexRowWrapper>
                        <div style={{  padding: '1%' }}>
                                        <div style={{width:"80px",borderRadius:"50%"}} >
                                            <img  style={{width: '70px', objectFit: 'contain', borderRadius: '10px'}} src={ele.jobid.companylogo ? `data:image/png;base64,${imgConvert(ele.jobid.companylogo.data)}` : DefaultJobIcon}/>
                                        </div>                                    
                                    </div>
                                    <div style={{ width : '90%',marginTop:"25px"}}>

                                    <div style={{color:'#5471E8', fontSize: '18px', fontWeight: 600, margin: '5px 0'}}>{ele.jobid.companyname}</div>
                                    <div style={{ color: '#535353', fontSize: '15px', fontWeight: 500, margin: '5px 0'}}>{ele.jobid.title}</div>
                                                            
                        </div>
                    </FlexRowWrapper>                
                    <FlexRowWrapper className='lowerDiv'>
                                        <div  className="sav-container">
                                            <img style={{ height: '10px', marginRight: '5px' }} src={ExpierienceIcon} />
                                            {ele.jobid.minexperience+'-'+ele.jobid.maxexperience+' Years of Experience'}
                                        </div>
                                        <div className="sav-one">
                                            <img style={{ height: '17px', width: '17px', marginRight: '1px', marginBottom: '-3px' }} src={LocationIcon} />
                                            {ele.jobid.location}
                                        </div>
                                        <div  className="save-two">{`${formatter.format(ele.jobid.minsalary)} - ${formatter.format(ele.jobid.maxsalary)} P.A.`}</div>                                        
                                        <div  className="save-three">
                                            <TransparentButton onClick={(e) => handleRemove(e, ele.jobid)} style={{ paddingBottom: '1px', border: 'none', color: '#D12424', backgroundColor: 'transparent', marginTop: '-4%'}}>Remove</TransparentButton>
                                            <ApplyTransparentButton onClick={(e) => handleApply(e, ele.jobid)} style={{ width: '35%', padding: '3%', borderColor: '#9D9D9D', marginTop: '-5%'}}>Apply now</ApplyTransparentButton>
                                        </div>                                    
                                    </FlexRowWrapper>
                <FlexRowWrapper  className="save-four">{calculateDay(ele.createdAt) <= 1 ? 'Recently Added' : calculateDay(ele.createdAt) + ' Days Ago'}</FlexRowWrapper>
            </FlexRowWrapper>
            <Addjob data={value} />
            </DivTile>
            )            
        })  
        :
        <div style={{ padding: '2% 0', textAlign: 'center' }}>No Saved Jobs</div>            
        }
    {/* // </Wrapper> */}
    </>
    )
}

export default SavedJobs