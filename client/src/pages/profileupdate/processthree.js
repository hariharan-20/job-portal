import React,{useState,useEffect}from "react"
import styled from 'styled-components'
import axios from "axios"
import {useHistory} from 'react-router-dom'

import { TextField, FormLabel, BlueButton} from '../../components/styledcomponent/styledcomponent'
import { useDispatch } from "react-redux"
import { college } from "../../../src/Redux/Features/profileSlice"
import "./profileupdate.css"

import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


const FormGroup = styled.div`
    margin: 2% 0;
    `
    
    const ProcessThree = () => {
        const history = useHistory()
        const dispatch = useDispatch()
        const [displayToast,setDisplayToast]=useState(false)
        
        const [school, setSchool] = useState()
        const [degree, setDegree] = useState()
        const [fieldOfStudy, setFieldOfStudy] = useState()
        const [passingYear, setPassingYear] = useState()
        const [location, setLocation] = useState()
        // const [description, setDescription] = useState()\

        const getData = async () => await axios.get('/api/user/allMyDetails')
        .then(res => {
            console.log(res.data)
            setSchool(res.data[1].school)
            setDegree(res.data[1].degree)
            setFieldOfStudy(res.data[1].fieldOfStudy)
            setPassingYear(res.data[1].passingyear)
            setLocation(res.data[1].location)
            // setDescription(res.data[1].desc)
        })
        .catch(err => {
            console.log(err.message)
        })

    const onSubmit = () => {
        const ProfessionalData = {
            school: school,
            degree: degree,
            fieldOfStudy: fieldOfStudy,
            passingYear: passingYear,
            location: location,
            // desc: description
        }
      
        dispatch(college(ProfessionalData))        

        axios({
            method:"post",
            url:`/api/user/myprofileeducational/`,
            data:ProfessionalData
        }).then((res) => {
            console.log(res)
            const type = localStorage.getItem('userType')                        
                        
            if(type === "U"){
                setTimeout(() => {
                    toast.info('Profile Update success', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,     
                        autoClose: 3000               
                    })            
                    setDisplayToast(true)
                }, 100)
                
                history.push('/')
            }if(type === "A"){
                setTimeout(() => {
                    toast.info('Profile  Update success', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,     
                        autoClose: 3000               
                    })            
                    setDisplayToast(true)
                }, 100)                            
                history.push('/admin/dashboard')
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const handleChange =(e) =>{
        if(e.target.name === 'school'){
            setSchool(e.target.value)
        }    
        if(e.target.name === 'degree'){
            setDegree(e.target.value)
        }
        if(e.target.name === 'fieldofstudy'){
            setFieldOfStudy(e.target.value)
        }
        if(e.target.name === 'passingyear'){
            setPassingYear(e.target.value)
        }
        if(e.target.name === 'location'){
            setLocation(e.target.value)
        }
    }

    useEffect(()=>{
        getData()
    },[])
    if(displayToast){
        return <ToastContainer toastClassName ="toastInfo"/>
    }
    return (
        <>
        <div style={{ padding: '1% 5%', textAlign: 'start' }}>
            <FormGroup onSubmit={onSubmit}>
                <FormLabel>School</FormLabel>
                <TextField className="one-input" value={school} name="school" onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Degree/Certificate</FormLabel>
                <TextField className="one-input" value={degree} name="degree" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Field of study</FormLabel>
                <TextField className="one-input" value={fieldOfStudy} name="fieldofstudy" onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Passing year</FormLabel>
                <TextField className="one-input"value={passingYear} name="passingyear" onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Location</FormLabel>
                <TextField className="one-input" value={location} name="location" onChange={handleChange}/>
            </FormGroup>
            {/* <FormGroup>
                <FormLabel>Description</FormLabel>
                <TextField type='textarea' style={{ width: '27vw', height: '8vh' }} value={description} name="description" onChange={handleChange}/>
            </FormGroup> */}
            <BlueButton onClick= {onSubmit} style={{width: '24rem', marginTop: '3%'}} >Continue</BlueButton>
        </div>
         
        </>
    )
    
}

export default ProcessThree