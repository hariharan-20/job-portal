import styled from 'styled-components'
import React, { useState,useEffect } from 'react'
import { BlueButton, FormLabel  } from '../../../components/styledcomponent/styledcomponent'

import { StyledMainRow, StyledMainContainer, StyledCol, StyledMainCol} from './style'

import LeftBoardArt from '../../../components/leftboardart/leftboardart'
import axios from "axios"
import Select from 'react-select'
import ReactTooltip  from 'react-tooltip'
import {useHistory} from "react-router-dom"
import {Button, Slider} from "material-ui-core"
import {useLocation} from "react-router-dom"
import { Title } from '../recentjobtile/style'
import { Media } from 'react-bootstrap'

const ImageDiv = styled.div`
    background-color: #0000001F;
    border-radius: 5%;
    width: 100px;
    height: 100px;
    padding: 0% 0%;
    // margin-right: 5%;
    text-align: center;
    // margin: 1% 3%;
`
const FlexRowWrapper = styled.div`
    display: ${props => props.isLogged ? 'none' : 'flex' };
    margin-top: 4%;
    flex-direction: row;       
    @media(max-width: 500px){
        flex-direction: column;
        margin-top: 15%;
    } 
`

const FlexRowSalaryWrapper = styled(FlexRowWrapper)`
    justify-content: space-between;
    width: 18rem;
    @media(max-width: 500px){
        flex-direction: row;
        margin-top: 2%;        
    }
`

const DescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1% 0;    
`

const TextField = styled.input `
    height: 2.5rem;
    width: 24rem;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 6px;    
    &:focus{        
        outline: none;        
    }   
    @media( max-width: 500px ){
        width: 18rem;
    } 
`

const TextAreaField = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 6px;
    resize: none;    
    &:focus{        
        outline: none;        
    }
    @media(max-width: 500px){
        width: 18rem;
    }
`


const PostNewJob = () => {
    const [img, setImg] = useState()
    const location  =useLocation()
  
    const history =useHistory()
    let options = [
        { value: 'react', label: 'react' },
        { value: 'python', label: 'python' },
        { value: 'node', label: 'node' }
      ]
    const [skills,setSkills] = useState(null)
    const [data,setData] =useState()
    const [form,setForm] =useState()
    const [imgData, setImgData] = useState()
    const [skillMsg, setSkillMsg] = useState()
    const [JobData, setJobData] = useState({
      
        companyname: "",
        title:"",
        jobtype: "",
        location: "",
        minsalary: "",
        maxsalary: "",
        description: "",
        
    })
    const [params, setParams] = useState("")
    const [val,setVal]=useState([0,15])
    const [title,setTitle] =useState()
    const[button,setButton]=useState()
    const[images,setImages]=useState()
    const [type,setType] =useState()
    const [vals,setVals]=useState(false)
    const [vals2,setVals2]=useState(true)
    const [loading, setLoading] = useState(false)
    const updateRange = (e,data) =>{
        setVal(data)
    }
    
    useEffect(() =>{
        const param = history.location.pathname.slice(7)
        if(location.state){
            setData(location.state.message)
        }
        if(data){            
            setVals(true)
            setVals2(false)
            setJobData(jobData=> {
                jobData.companyname = data.companyname
                jobData.title = data.title
                jobData.jobtype = data.jobType
                jobData.location = data.location
                jobData.minsalary=data.minsalary
                jobData.maxsalary = data.maxsalary
                jobData.description =data.description
                setVal([data.minexperience, data.maxexperience])
                options = []
                data.skills.map((ele,i) => {
                    options.push({
                        value: ele,
                        label: ele
                    })
                })
                return jobData
            })
            if(data.companylogo){
                const imp = data.companylogo.data
                const buff = Buffer (imp, 'base64')
                const result = buff.toString('base64')                
                setImages(result)
                setImg(result)
            }
        
        }
        setParams(param)
        if(params === "postnewjob"){
            setType('a')
            setTitle("Post a Job!")
            setButton('Submit')
        }if(params === "jobupdate"){
            setType('b')
            setTitle("Update your Job")
            setButton('Update')
            
        }
        
    },[params,data])
    const handleChange = (e) => {
        setJobData({
            ...JobData,
            [e.target.id]: e.target.value
        }) 
    }
    const handleImg = (e) => {
        const file = e.target.files[0]
        setImgData(file)
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
            setImg(e.target.result)
        }
    }
    const handleChanges = (value) =>{
        setSkills(value)
    }    
    
    const handleSubmit = (e) => {
        e.preventDefault()                
        let formData = new FormData()

        formData.append('image',imgData)
        formData.append('companyname',JobData.companyname)
        formData.append('title',JobData.title)
        formData.append('jobType',JobData.jobtype)
        formData.append('location',JobData.location)
        formData.append('minsalary',JobData.minsalary)
        formData.append('maxsalary',JobData.maxsalary)
        formData.append('description',JobData.description)
        formData.append('minexperience',val[0])
        formData.append('maxexperience',val[1])
        formData.append('skills',JSON.stringify(skills))                
       
        if(params === "postnewjob"){
            setLoading(true)
            axios({
                method: "post",
                url: ('/api/job/new'),
                data:formData
            }).then((res) => {                
                setLoading(false)                
                history.push({
                    pathname:"/admin/dashboard"
                })                
                .catch(err => {                    
                    setLoading(true)
                })
            })
        }if(params === "jobupdate") {
            if(skills){
                setLoading(true)
                formData.append('id',data._id)      
                axios({
                    method: "post",
                    url: ('/api/job/edit'),
                    data:formData
                    
                }).then((res) => {                
                    setLoading(false)                
                    history.push({
                        pathname:"/admin/dashboard"
                    })                
                })
                .catch(err => {
                    console.log(err)
                    setLoading(true)
                })
            } else {
                setSkillMsg('Skills are empty')
                setTimeout(() => {
                    setSkillMsg('')
                }, 4000)
            }            
        }
    }                
    return (
        <FlexRowWrapper style={{ background: '#FFFFFF', }}>
            <LeftBoardArt></LeftBoardArt>            
                <div style={{ padding: '1% 8%' }}>
                    <h2 style={{ margin: '1% 0'}}>{title && title }</h2>
                    <form onSubmit={handleSubmit}>
                        <ImageDiv style={{overflow:"hidden"}}>
                            {img && <img style={{ width: '100px',height:"110px",objectFit:"cover"}} src={img ? img : null}  name="image" hidden={vals} /> }
                            {images &&  <img style={{ width: '100px',height:"110px",objectFit:"cover"}} src={`data:image/png;base64,${images}`} name="image" hidden={vals2}/> }
                            <div style={{ margin: '35% 16%'}}>
                                <label style={{ fontSize: '12px', padding: '1%', borderRadius:"50%",cursor:"pointer",color:"#5471E8", margin: 0}} for="input">
                                    <input type="file" id="input" name="image" accept="image/*" onChange={handleImg} hidden
                                />{img ? "" : "Add a photo"}</label>
                            </div>
                                                           
                        </ImageDiv> 
                        <FlexRowWrapper style={{ margin: '1% 0'}}>
                            <div style={{ width: '50%', marginRight: '2%'}}>
                                <FormLabel for="companyname">Company Name</FormLabel>
                                <br />
                                <TextField id="companyname" value={JobData.companyname} onChange={handleChange}required></TextField >
                            </div>
                            <div style={{ width: '50%'}}>
                                <FormLabel for="location">Location</FormLabel>
                                <br />
                                <TextField id="location" value={JobData.location} onChange={handleChange} required></TextField >
                            </div>
                        </FlexRowWrapper>
                        <FlexRowWrapper style={{ margin: '1% 0'}}>
                            <div style={{ width: '50%', marginRight: '2%'}}>
                                <FormLabel for="title">Job Title</FormLabel>
                                <br />
                                <TextField id="title" value={JobData.title} onChange={handleChange} required></TextField >
                            </div>
                            <div style={{ width: '50%'}}>
                                <FormLabel for="jobtype">Job Type</FormLabel>
                                <br />
                                <TextField id="jobtype" value={JobData.jobtype} onChange={handleChange} required></TextField >
                            </div>
                        </FlexRowWrapper>
                        <FlexRowWrapper style={{ margin: '1% 0'}}>
                            <div style={{ width: '50%', marginRight: '2%'}}>
                                <FormLabel for="salary">Salary</FormLabel><br />
                                <FlexRowSalaryWrapper>
                                    <TextField id="minsalary"style={{width:"8rem"}} type='number' min='0' value={JobData.minsalary} placeholder="Min" onChange={handleChange} required></TextField >                                            
                                    <TextField id="maxsalary"style={{width:"8rem"}}  type='number' min='0' value={JobData.maxsalary} placeholder="Max" onChange={handleChange} required></TextField >
                                </FlexRowSalaryWrapper>
                            </div>
                            <div style={{ width: '50%'}}>
                                <FormLabel  for="experience"> Experience</FormLabel>
                                <br />
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <label>0</label>
                                    <label>15</label>
                                </div>
                                
                                 <Slider
                                    style={{ padding: 0}}
                                    value={val}
                                    onChange={updateRange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={15}
                                    style={{ marginLeft: '5px', padding: '13px 0' }}

                                 />
                                {/* <TextField  data-tip={exp}    type= 'range' min='0' max='15' style={{ width: '24rem', cursor: 'pointer'}} id="experience" onChange={(e)=>setExp(e.target.value)} required ></TextField >
                                <FormLabel for="experience">Maximum Experience    <span>{exp1 ? exp1 : "please select you experience"}</span></FormLabel>
                                <TextField  data-tip={exp}    type= 'range' min='0' max='15' style={{ width: '24rem', cursor: 'pointer'}} id="experience1" onChange={(e)=>setExp1(e.target.value)} required ></TextField > */}
                                <ReactTooltip/>
                                
                            </div>
                        </FlexRowWrapper>
                        <FlexRowWrapper style={{ margin: '1% 0'}}>
                            <div style={{ width: '50%', marginRight: '2%'}}>
                                <FormLabel for="skills">Skills</FormLabel>
                                <br />                                
                                <Select {...skills}
                                        options={options} 
                                        closeMenuOnSelect={false}
                                        onChange={handleChanges}
                                        defaultValue={[options[4], options[5]]}
                                        isMulti                                        
                                        value={skills}                                                                                 
                                    />
                                {skillMsg && <p style={{ color: 'red', fontSize: '12px'}}>{skillMsg}</p>}
                            </div>
                        </FlexRowWrapper>                                                
                        <DescWrapper>
                            <FormLabel>Description</FormLabel>
                            <TextAreaField value={JobData.description} maxLength='500' rows='5' cols='50' id='description' onChange={handleChange} required/>
                        </DescWrapper>                                                   
                        <div style={{ marginTop: "15px", marginBottom: "15px", display: 'flex' }}>
                            <input type='checkbox' style={{ marginTop: '3px'}} required />
                            <span style={{ fontSize: "x-small", margin: "3px 10px" }}>I agree to <span style={{ color: '#538CD6', cursor: 'pointer' }}>terms and policies</span></span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <BlueButton type="submit" disabled={loading} style={{ width: '70%', opacity: loading ? '0.5' : '1' }}>{loading ? <i class="fas fa-spinner fa-pulse"></i> : button}</BlueButton>
                        </div>
                    </form>
                </div>            
        </FlexRowWrapper>


    // <StyledMainContainer>
    //     <StyledMainRow>
    //         <StyledMainCol md={6}><LeftBoardArt></LeftBoardArt> </StyledMainCol>
    //         <StyledMainCol md={6}>
    //             <Title>Post a new Job</Title>
    //         </StyledMainCol>
    //     </StyledMainRow>
    // </StyledMainContainer>
    )
}


export default PostNewJob