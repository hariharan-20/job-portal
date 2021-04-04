import styled from 'styled-components'
import React,{useState,useEffect}from "react"
import { TextField, FormLabel, BlueButton, SelectField} from '../../components/styledcomponent/styledcomponent'
import { useDispatch } from "react-redux"
import axios from "axios"
import { job } from "../../../src/Redux/Features/profileSlice"
import "./profileupdate.css"
// import { getDefaultMiddleware } from '@reduxjs/toolkit'
const FormGroup = styled.div`
    margin: 2% 0;
`

const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    flex-direction: row;       
    // @media(max-width: 500px){
    //     margin-top: 17%;
    // } 
`

const ProcessTwo = (props) => {

    const [designation, setDesignation] = useState()
    const [companyName, setCompanyName] = useState()
    const [startYear, setStartYear] = useState()
    const [startMonth, setStartMonth] = useState()
    const [endYear, setEndYear] = useState()
    const [endMonth, setEndMonth] = useState()
    const [currentlyCheck, setCurrentlyCheck] = useState(false)
    const [description, setDescription] = useState()
    const [months] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'])

    const getData = async () => await axios.get('/api/user/allMyDetails')
        .then(res => {
            setDesignation(res.data[2].currentdesignation)
            setCompanyName(res.data[2].companyname)
            setStartYear(res.data[2].startyear)
            setStartMonth(res.data[2].startmonth)
            setEndYear(res.data[2].endyear)
            setEndMonth(res.data[2].endmonth)
            setCurrentlyCheck(res.data[2].iscurrentlyworkhere)
            if(res.data[2].iscurrentlyworkhere) {
                document.getElementById('endYear').style.display = 'none'
            } else {
                document.getElementById('endYear').style.display = 'flex'
            }
            setDescription(res.data[2].workdescription)
        })
        .catch(err => {
            console.log(err.message)
        })


    // const[id,setId]=useState()
    const dispatch = useDispatch()    
    
    const handleChanges =(e) =>{
        if(e.target.name === 'designation') {
            setDesignation(e.target.value)
        }    
        if(e.target.name === 'companyname') {
            setCompanyName(e.target.value)
        }    
        if(e.target.name === 'startyear') {
            setStartYear(e.target.value)
        }    
        if(e.target.name === 'startmonth') {
            setStartMonth(months.indexOf(`${e.target.value}`)+1)
        }    
        if(e.target.name === 'endyear') {
            setEndYear(e.target.value)
        }    
        if(e.target.name === 'endmonth') {
            setEndMonth(months.indexOf(`${e.target.value}`)+1)
        }    
        if(e.target.name === 'currentlycheck') {
            e.target.checked ? setCurrentlyCheck(true) : setCurrentlyCheck(false)
            if(e.target.checked) {
                document.getElementById('endYear').style.display = 'none'
            } else {
                document.getElementById('endYear').style.display = 'flex'
            }
        }    
        if(e.target.name === 'description') {
            setDescription(e.target.value)
        }    
    }

    useEffect(() =>{
        getData()
    },[])

    const onSubmit = (e) => {
        e.preventDefault()
        const JobData ={
            currentdesignation: designation,
            companyname: companyName,
            startyear: startYear,
            startmonth: startMonth,
            endyear: endYear,
            endmonth: endMonth,
            iscurrentlyworkhere: currentlyCheck,
            description: description
        }
         
     
        dispatch(job(JobData))
        // localStorage.setItem("job",JSON.stringify(JobData))
        axios({
            method:"post",
            url:`/api/user/myprofileprofessional/`,
            data:JobData
        }).then((res) => {
            console.log(res)
            props.SetProcess.processOne(false)
            props.SetProcess.processTwo(false)
            props.SetProcess.processThree(true)
        })
        .catch( err => {
            console.log(err.message)
        })
    }
    return (
        <form style={{ padding: '1% 4%', textAlign: 'start' }} onSubmit={onSubmit}>
            <FormGroup>
                <div><FormLabel>Current designation</FormLabel></div>
                <div><TextField className="one-input" value={designation} name="designation" onChange={(e)=>handleChanges(e)}/></div>
            </FormGroup>
            <FormGroup>
                <div><FormLabel>Company Name</FormLabel></div>
                <div><TextField className="one-input"  value={companyName} name="companyname" onChange={handleChanges}/></div>                
            </FormGroup>
            <FlexRowWrapper className="year-container">
                <FormGroup style={{ width: '49%'}}>
                    <div><FormLabel>Start year</FormLabel></div>
                    <div><TextField style={{ width: '10.5rem', }} type='number' placeholder='Start Year' name="startyear" min='2000' max='2021' value={startYear} onChange={handleChanges}/></div>                                    
                </FormGroup>
                <FormGroup style={{ width: '45%'}}>
                    <div><FormLabel>Start month</FormLabel></div>
                    <div>                        
                        <SelectField  className="month-container" style={{ width: '11rem', padding: '4.5%' }} value={months[startMonth-1]} name="startmonth" onChange={handleChanges}>
                            {months.map((ele, i) => {                                
                                return <option key={i} value={ele}>{ele}</option>
                            })}
                        </SelectField>
                    </div>                    
                </FormGroup>
            </FlexRowWrapper>
            <FlexRowWrapper className="year-container" id="endYear">
                <FormGroup style={{ width: '49%'}}>
                    <div><FormLabel>End year</FormLabel></div>
                    <div><TextField style={{ width: '10.5rem' }} type='number' placeholder="End Year" name="endyear" min='2000' max='2021' value={endYear} onChange={handleChanges}/></div>                                                        
                </FormGroup>
                <FormGroup style={{ width: '45%'}}>
                    <div><FormLabel>End month</FormLabel></div>
                    <div>                        
                        <SelectField className="month-container" style={{ width: '11rem', padding: '4.5%' }} value={months[endMonth-1]} name="endmonth" onChange={handleChanges}>
                            {months.map((ele, i) => {                                
                                return <option key={i} value={ele}>{ele}</option>
                            })}
                        </SelectField>
                    </div>                    
                </FormGroup>
            </FlexRowWrapper>
            <FlexRowWrapper>
                <div>
                    <input type='checkbox' name="currentlycheck" checked={currentlyCheck} onChange={handleChanges} required/>
                    <FormLabel style={{ marginLeft: '5px'}}>I currently work here</FormLabel>
                </div>
            </FlexRowWrapper>
            <FormGroup>
                <div><FormLabel>Description</FormLabel></div>
                <div><TextField style={{ height: '8vh'}} className="one-input" type='textarea' name="description" value={description} onChange={handleChanges}/></div>
            </FormGroup>
            <BlueButton onClick={onSubmit} style={{width: '24rem', marginTop: '3%'}}>Continue</BlueButton>
         
        </form>
     
    )
}

export default ProcessTwo