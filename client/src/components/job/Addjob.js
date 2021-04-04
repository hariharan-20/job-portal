import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import {useSelector,useDispatch} from "react-redux"
import {modalView,change} from "../../Redux/Features/modals"
import { FlexRowWrapper } from '../styledcomponent/styledcomponent'

import ExpierienceIcon from '../../assets/experienceicon.svg'
import DefaultJobIcon from '../../assets/defaultjob.svg'
import closeButton from '../../assets/modalclosebutton.svg'
import LocationIcon from '../../assets/locationicon.svg'
import "./addjob.css"
import axios from 'axios'

// import AlertModal from '../alertmodal/alertmodal'
// import { toastReducer, changeToast } from '../../Redux/Features/alertToast'

import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
// import { type } from 'os'

const ModalWrapper = styled.div`
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
`

const ModalBackDrop = styled.div`
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #F7F7F7;
    opacity: 0.5;
`


const BlueButton = styled.button `
    width: 100%;
    padding-top: 11px;
    padding-bottom: 11px;
    border: none;
    border-radius: 4px;
    color: white;
    background: #5471E8;
    font-size: small;
    cursor: pointer;
    margin-top: 3%;
    &:focus{
        outline: none;
    }
    @media(max-width:800px){
        width:70%;
       
    }
`

const BoxModal = styled.div`
    position: relative;
    top:50%;
    left:50%;
    right: 0;
    transform: translate(-50%,-50%);
    height: 50%;
    width: 50%;
    overflow-y: auto;
    background-color: white;
    box-shadow: 0px 2px 4px #00000029;
    z-index: 1000;
    @media(max-width:800px){
        width: 75%;
        height: 80%;
        margin-top: 5%;
    }
`
const TextField = styled.input `
    width:17.5vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    padding: 5%;
    margin-bottom: 15px;
    color: #7C7C7C;    
    &:focus{        
        outline: none;        
    }
    @media(max-width:800px){
        width:100%;
        height:3rem;
    }
`
const BoxModals = styled.div`
    position: relative;
    top:50%;
    left:50%;
    right: 0;
    transform: translate(-50%,-50%);
    height: 30%;
    width: 30%;
    overflow-y: auto;
    background-color: white;
    box-shadow: 0px 3px 6px #00000029;
    z-index: 10;
`


const Addjob = ({data}) => {    
    const state = useSelector(modalView)
    const dispatch = useDispatch()     
    const history = useHistory()          
    const [alertMessage, setAlertMessage] = useState('')    
       
   const [types,setTypes]  = useState()
   const [name,setName]=useState()
   const [email,setEmail]=useState()
   const[phone,setPhone]=useState()
   const[id,setId]=useState()

   const [mydata,setMydata]=useState()

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

   
   useEffect(()=>{
        const type =localStorage.getItem("userType")
        setTypes(type)
        if(type) {
            axios({
                method:"get",
                url:"/api/user/allMyDetails"
            }).then((res)=>{               
                setMydata(res.data)                        
            })   
        }        

        if(mydata){
            setEmail(mydata[0].email)
            setName(mydata[0].name)
            setPhone(mydata[0].phone)
        }

        document.addEventListener('keydown', function(event){

        if(event.key === 'Escape'){
            dispatch(change(false))            
        }})

        if(data){
            console.log(data._id)
            setId(data._id)
        }
   },[state])
  
   const close = () =>{       
       if(types){
            axios({
                method:"post",
                url:"http://localhost:8080/api/job/apply-for-job",
                data:{
                    id:id
                },
            })
            .then((res)=>{                                
                setAlertMessage('Success')                
                
                toast.info('Job Applied Success', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,     
                    autoClose: 3000               
                })                
                dispatch(change(false))                                            
            })
            .catch((err)=>{
                console.log(err.message)
            })}
         else {            
            history.push({
                pathname:"/signin",
                state:{
                    message:"For applying jobs please Sign In first"
                }
            })
        }
   }

   if(state){
    return (
        <>
        {(name && email && phone) && 
        <div>
            {types ?
            <ModalWrapper>
                <ModalBackDrop></ModalBackDrop>                                
                    <BoxModal>
                      
                        {console.log(data)}
                        <div style={{textAlign: 'end'}}><img style={{width: '12px', margin: '2% 3%', cursor: 'pointer'}} src={closeButton} onClick={() => dispatch(change(false))} /></div>
                        <div className="add-container">
                            <div className="addone">  
                            <div className="addtwo">
                                <FlexRowWrapper style={{ margin: '8%'}}>
                                    <div style={{ height: '50px', width: '50px', marginRight: '15px'}}>
                                      <img style={{height: '50px',width: '50px',borderRadius: '10px', objectFit: 'contain'}} src={data.companylogo ? `data:image/png;base64,${imgConvert(data.companylogo)}` : DefaultJobIcon} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500, color: '#5471E8', fontSize: '20px'}}>{data.companyname}</div>                                        
                                        <div style={{ fontWeight: 500, color: '#535353', fontSize: '15px'}}>{data.title}</div>
                                    </div>
                                </FlexRowWrapper>
                                <FlexRowWrapper style={{ margin: '5%'}}>
                                    <img style={{ height: '10px', marginRight: '5px', marginTop: '3px' }} src={ExpierienceIcon} />
                                    <div style={{ fontSize: '12px', color: '#535353', fontWeight: 500}}>{data.minexperience+' - '+data.maxexperience+'years of experience'}</div>
                                </FlexRowWrapper>
                                <FlexRowWrapper style={{ margin: '5%'}}>
                                    <img style={{ height: '17px', width: '17px',    marginLeft: '-3px', marginRight: '4px', marginBottom: '-3px' }} src={LocationIcon} />
                                    <div style={{ fontSize: '12px', color: '#535353', fontWeight: 500}}>{data.location}</div>
                                </FlexRowWrapper>
                                <FlexRowWrapper style={{ margin: '5%'}}>                                    
                                    <div style={{ fontSize: '12px', color: '#535353', fontWeight: 500}}>{formatter.format(data.minsalary)+' - '+formatter.format(data.maxsalary)+' P.A.'}</div>
                                </FlexRowWrapper>
                                <div style={{ fontSize: '10px', color: '#BAB7B7', fontWeight: 500, margin: '5%'}}>{calculateDay(data.createdAt) === 1 ? 'a day ago' : calculateDay(data.createdAt)+' days ago'}</div>
                            </div>
                            </div>
                      
                            <div className="addthree"></div>
                            <div className="addfour">
                                <div><TextField  placeholder='Name' name='name'value={name} /></div>
                                <div><TextField  placeholder='Email'value={email} name='email' /></div>
                                <div><TextField  placeholder='Phone no' name='phone'value={phone}  /></div>
                                <BlueButton style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block'}} onClick={() => close()}>Apply Now</BlueButton>
                            </div>
                      
                            
                            
                        </div>
                        </BoxModal>
                        
                                          
                                                               
                    {/* <BoxModals>
                      <div  style={{display:"flex",flexDirection:"column"}}>
                           <p style={{marginTop:"50px"}}>Please Sign In</p> 
                           <BlueButton style={{width:"5rem",marginLeft: '42%',marginTop:"6%"}}
                                 onClick={close}>{types ? "submit" : "OK"}</BlueButton>
                        </div> 
                    </BoxModals> */}                                                                        
            </ModalWrapper>
            : null
            }
         
        </div>
    }
        </>
    )
    }
    return  <ToastContainer toastClassName ="toastInfo"/> 
 
}


export default Addjob
