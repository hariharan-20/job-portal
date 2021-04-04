import styled from 'styled-components'
import React, { useState, useEffect } from "react"
import axios from "axios"
import {  TextField, FormLabel, BlueButton } from '../../components/styledcomponent/styledcomponent'
import AvatarIcon from '../../assets/guestavatar.svg'
import { useDispatch, useSelector } from "react-redux"
import { userProfile, update, image } from "../../../src/Redux/Features/profileSlice"
import "./profileupdate.css"
const FormGroup = styled.div`
    margin: 2% 0;
`

const ImageDiv = styled.div`
    background-color: #0000001F;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    padding: 0% 0%;
    margin-right: 5%;
    
`

const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    flex-direction: row;       
    // @media(max-width: 500px){
    //     margin-top: 17%;
    // } 
`

const UploadLabel = styled.label`
    margin-top: 6%;
    margin-left: 5%;
    height: 3rem;
    width: 7rem;
    border: 1px solid #5471E8;
    border-radius: 4px;
    padding: 1% 0;
    font-size: 14px;
    color: #5471E8;
    cursor: pointer;
    text-align:center;
    padding-top:10px;
    @media(max-width:700px){
        
        width: 7rem;
        height: 3rem;
        padding-top: 5%;
        text-align: center;
    }
`

const ProcessOne = (props) => {
    const dispatch = useDispatch()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [location, setLocation] = useState()
    const [imgData, setImgData] = useState()
    const [image, setImg] = useState()

    const geData = async () => await axios.get('/api/user/allMyDetails')
        .then(res => {
            setName(res.data[0].name)
            setEmail(res.data[0].email)
            setPhone(res.data[0].phone)
            setLocation(res.data[3].location)
            // setImgData()
            setImg(`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(res.data[3].displayimage.data)))}`)

        })
        .catch(err => {
            console.log(err.message)
        })


    useEffect(() => {
        geData()
    }, [])

    const handleImg = (e) => {
        const file = e.target.files[0]
        setImgData(file)
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
            setImg(e.target.result)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const nameData = {
            name: name,
            email: email,
            phone: phone,
            location: location
        }

        dispatch(update(nameData))

        let formData = new FormData()

        formData.append('image', imgData)
        formData.append('name', nameData.name)
        formData.append('email', nameData.email)
        formData.append('phone', nameData.phone)
        formData.append('location', nameData.location)

        axios({
            method: "post",
            url: `/api/user/myprofilepersonal`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        }).then((res) => {
            console.log(res)
            if(res.status === 200) {
                props.SetProcess.processOne(false)
                props.SetProcess.processTwo(true)
                props.SetProcess.processThree(false)
            }            
        }).catch(err => {
            console.log(err.message)
        })
    }
    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name === 'phone') {
            setPhone(e.target.value)
        }
        if (e.target.name === 'location') {
            setLocation(e.target.value)
        }
    }

    return (
        <div style={{ padding: '1%' }}>
            <FlexRowWrapper className="container-one">
                <ImageDiv style={{ width: '75px', height: '75px'}}>
                    <img style={{ padding: image ? 0 : '5% 0% 5% 15%' ,width: image? '75px' : '65px', height: image ? '75px' : "65px", 
                        objectFit: "cover", borderRadius: image ? "50%" : 0 }} src={image ? image : AvatarIcon} name="image" />
                </ImageDiv>
                <UploadLabel for="input">Upload Image</UploadLabel>
                <input type="file" id="input" name="image" accept="image/*" onChange={handleImg} hidden />
            </FlexRowWrapper>
            <form onSubmit={handleSubmit} style={{ textAlign: 'start' }} id='personal-detail'>
                <FormGroup >
                    <div><FormLabel>name</FormLabel></div>
                    <div><TextField  className="one-input" name="name" onChange={handleChange} value={name} required /></div>
                </FormGroup>
                <FormGroup>
                    <div><FormLabel>Email id</FormLabel></div>
                    <div><TextField className="one-input" name="email" onChange={handleChange} value={email} required /></div>
                </FormGroup>
                <FormGroup>
                    <div><FormLabel>Mobile no</FormLabel></div>
                    <div><TextField className="one-input" name="phone" onChange={handleChange} value={phone} required /></div>
                </FormGroup>
                <FormGroup>
                    <div><FormLabel>Location</FormLabel></div>
                    <div><TextField className="one-input" name="location" onChange={handleChange} value={location} required /></div>
                </FormGroup>
                <BlueButton type='submit' style={{ width: '24rem', margin: '2% 0' }}>Continue</BlueButton>
            </form>
        </div>
    )
}

export default ProcessOne