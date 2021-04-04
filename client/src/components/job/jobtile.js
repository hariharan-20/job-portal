import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components'
import { BlueButton, TransparentButton } from '../styledcomponent/styledcomponent'
import Addjob from "./Addjob"
import ExpierienceIcon from '../../assets/experienceicon.svg'
import LocationIcon from '../../assets/locationicon.svg'
import SaveIcon from '../../assets/greyicon.svg'
import SavedIcon from '../../assets/savedicon.svg'
import DefaultJobIcon from '../../assets/defaultjob.svg'
import { useSelector, useDispatch } from "react-redux"
import { modalView, change } from "../../Redux/Features/modals"
import { useHistory } from 'react-router'
import { searchBar, search, length } from "../../Redux/Features/search"
import { Button, CircularProgress } from "material-ui-core"
import GreyIcon from "../../assets/greyicon.svg"
import "./jobtile.css"
import Pagination from 'react-bootstrap/Pagination'
import { ToastContainer, toast } from 'react-toastify'
import Loading from "../../assets/loading.svg"
import "react-toastify/dist/ReactToastify.css"


const DivTile = styled.div`        
    borderRadius: 4px;
    display: flex;    
    background-color: ${props => props.background};
    &:hover{
        background-color: #D6DEFF48;         
    }
    @media(max-width:500px){        
        &:hover{
            background-color:white;         
        }

    }
`
const StyleDiv = styled.div`
    padding:15px;
    text-align:start;
    color:#ffffff;
    font-weight:500;
    font-size:18px;
    background-color:#5471E8;
    @media (max-width: 768px) {
        background-color:white;
        color:black;
        border:none;
    } 
`
const ApplyTransparentButton = styled(TransparentButton)` 
    ${DivTile}:hover &{    
        color: #FFFFFF;
        border-color: transparent;
        background: #5471EB;
    }
    @media(max-width: 500px) {
        display: none
    }
`
const Indicator = styled.div`
    background: #FFFFFF;
    border-radius: 4px;
    border: 1.5px solid #FFFFFF;
    opacity: 1;            
    ${DivTile}:hover &{
        transition: 0.5s all;
        border-color: #5471E8;
        background: #5471EB;
    }
    @media (max-width: 768px) {
        display:none;
        
      }   
`

const SaveButton = styled.button`    
    width: 80%;
    display: flex;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    font-size: 14px;
    border:none;
    padding: 0 5%;  
    &:focus {
        outline: none;
    }
`

const FlexRowWrapper = styled.div`
    display: ${props => props.isLogged ? 'none' : 'flex'};
    flex-direction: row;       
    @media(max-width: 500px){
        // margin-top: 17%;
    } 
`
const SaveImg = styled.img`
    width: 20px;
    margin-top: 4px;
    @media(max-width: 500px){
        margin-top: 2px;
    }
`


const JobTile = (props) => {
    
    const [data, setData] = useState()
    const [jobsCount, setJobsCount] = useState()
    const [activePage, setActivePage] = useState()
    const [savedJobs, setSavedJobs] = useState()
    const [value, setValue] = useState()
    const [types, setTypes] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    const datas = useSelector(searchBar)
    const [skill, setSkill] = useState('')
    const [location, setLocation] = useState('')
    const [count, setCount] = useState(1)
    const [loading, setLoading] = useState()
    const [state, setState] = useState()
    const [page, setPage] = useState()
    const params = useParams();

    // const getSavedJob = async () => await axios.get('/api/user/get-saved-job')

    let items = [];
    let active = { count };
    
    for (let number = 1; number <= Math.ceil(jobsCount /10); number++) {
        items.push(
            <a className='page-link' style={{ textDecoration: 'none', border: 'none', padding: 0}} href={`/${number}`}>
                <Pagination.Item key={number} active={number === count} onClick={() => handlePage(number)}>
                    {number}
                </Pagination.Item>
            </a>
        )
    }

    const handlePage = (value) => {
            active = value
            setCount(value)
            setLoading(true)        
            setPage(value)                
    
            axios({
                method: "get",
                url: `/api/job/wfall?page=${value-1}`,
            })
                .then((res) => {                    
                    setData(res.data)
                    setLoading(false)
                    window.location.href.concat(`${value}`)
                })
    }
    const getData = async (types) => {

        setLoading(true)
        axios({
            method: "get",
            url: `api/job/wfallcount?keyword=${''}&location=${''}`,
        })
            .then((countRes) => {                         
                setJobsCount(countRes.data)                
            })

        if (types) {
            await axios.get('/api/job/wfall')
                .then(res => {                    
                    setData(res.data)
                    setLoading(false)
                })
                .catch(err => {                    
                    if (err) {
                        history.push({
                            pathname: "/signin"
                        })
                        localStorage.removeItem("userType")
                    }
                })
        } else {
            await axios.get('/api/job/wfall')
                .then(res => {
                    setData(res.data)
                    setLoading(false)                    
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    const handleClicks = (ele) => {
        console.log(ele)
        if (types) {
            if (ele) {
                dispatch(change(true))
                setValue(ele)
            }
        } else {
            history.push({
                pathname: "/signin",
                state: {
                    message: "For applying jobs please Sign In first"
                }
            })
        }

    }
    const handleWrapper = (e, ele) => {
        history.push({
            pathname: '/viewjob',
            state: {
                ele: ele
            }
        })
    }
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

    const handleSaveButton = (ele, i) => {
        if (types) {
            if (ele) {
                axios.post('/api/user/save-job', { id: ele._id })
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res)
                            setData([
                                ...data,
                                data[i].isSaved = true,
                            ])
                        }
                    })
                    .catch(err => {
                        axios.delete(`/api/user/delete-saved-job/${ele._id}`)
                            .then(res => {
                                setData([
                                    ...data,
                                    data[i].isSaved = false,
                                ])
                            })
                            .catch(err => {
                                console.log(err.message)
                            })
                    })
            }
        } else {
            history.push({
                pathname: "/signin",
                state: {
                    message: "For Saving jobs please Sign In first"
                }
            })
        }

    }

    const imgConvert = (value) => {
        const buff = Buffer(value, 'base64')
        const result = buff.toString('base64')
        return result
    }    

    useEffect(() => {
        const type = localStorage.getItem("userType")
        setTypes(type)        

        if (type) {
            axios({
                method: "get",
                url: "/api/user/isAuthenticated"
            })
                .catch((err) => {
                    window.alert("session timed out")
                    history.push({
                        pathname: "/signin"
                    })
                    localStorage.removeItem("userType")
                })
        }

        if (datas.search.skill || datas.search.location) {
            setLoading(true)
            if (!datas.search.skill) {
                setLocation(datas.search.location)
                setSkill('')
            } else if (!datas.search.location) {
                setSkill(datas.search.skill)
                setLocation('')
            } else if (datas.search.skill && datas.search.location) {
                setSkill(datas.search.skill)
                setLocation(datas.search.location)
            }
            if(skill === datas.search.skill || location === datas.search.location){
                axios({
                    method: "get",
                    url: `api/job/wfallcount?keyword=${skill}&location=${location}`,
                })
                    .then((countRes) => {                         
                        setState(countRes.data)                    
                        setLoading(false)
                        console.log(countRes.data)                        
                    })
    
                axios({
                    method: "get",
                    url: `/api/job/wfall?keyword=${skill}&location=${location}`,
                }).then((res) => {                     
                    setData(res.data)
                    console.log(res.data)                     
                })
            }            
        } else {
            getData(type)
            setState(0)
        }
    }, [datas, skill, location])


    if (data == "") {
        return (
            <div style={{ padding: '2% 0', textAlign: 'center' }}>No Jobs to show</div>
        )
    }
    return (
        <>
        <FlexRowWrapper style={{ justifyContent: 'space-between', padding: '0 1%'}}>
            <Button disabled={count === 1 ? true : false} onClick={() => handlePage((count-1))}>{`< Prev`}</Button>
            <Button disabled={items.length === count ? true : false} onClick={() => handlePage((count+1))}>{`Next >`}</Button>
        </FlexRowWrapper>
            <StyleDiv>
                {state ? `Search Results ${state}` : "Latest Jobs"}
            </StyleDiv>
            {loading && <div style={{ textAlign: "center" }}>
                {/* <CircularProgress color="secondary" /> */}
                <img className="loader" src={Loading}/>
            </div>
                ||
                <>
                    {console.log(props)}
                    {data &&
                        data.length > 0 ?
                        data.map((ele, i) => {

                            return (

                                <DivTile key={i} background={i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}>
                                    <Indicator ></Indicator>
                                    <div className="main-container" >                                        
                                        <FlexRowWrapper className="sub-container" >
                                            <div className="img-container">
                                                <div className="img-containertwo">
                                                    <img src={ele.companylogo ? `data:image/png;base64,${imgConvert(ele.companylogo)}` : DefaultJobIcon} />
                                                </div>
                                            </div>
                                            <div className="container-one" onClick={(e) => handleWrapper(e, ele)}>
                                                <div className="inner-containerone">
                                                    <h3>{ele.companyname}</h3>
                                                    <h3>{ele.title}</h3>
                                                </div>
                                                <FlexRowWrapper className="container-two">
                                                    <span id="spanMid" style={{ color: '#9d9d9d', fontWeight: '600' }}>
                                                        <img style={{ width: '15px', marginRight: '5px', marginBottom: '4px' }} src={ExpierienceIcon} />{ele.minexperience + '-' + ele.maxexperience + ' Years of Experience'}</span>
                                                    <span id="spanMid" style={{ color: '#9d9d9d', fontWeight: '600' }}>
                                                        <img style={{ height: '17px', width: '17px', marginRight: '1px', marginBottom: '0px', }} src={LocationIcon} />
                                                        {ele.location}
                                                    </span>
                                                    <span id="spanMid" style={{ color: '#9d9d9d', fontWeight: '600' }}>{formatter.format(ele.minsalary) + ' - ' + formatter.format(ele.maxsalary) + " P.A"} </span>
                                                </FlexRowWrapper>
                                            </div>                                            
                                            <div className="save-container">
                                                {/* {types && */}
                                                    <SaveButton onClick={() => handleSaveButton(ele, i)}>
                                                        <h4 style={{ margin: '7%', color: '#535353', fontWeight: 500 }}>{ele.isSaved ? 'Saved' : 'Save'}</h4>
                                                        <SaveImg src={ele.isSaved ? SavedIcon : SaveIcon} />
                                                    </SaveButton>
                                                {/* } */}
                                                <ApplyTransparentButton style={{ width: 'auto', padding: '0.5rem 1.5rem', borderColor: '#9D9D9D', whiteSpace: 'nowrap' }} onClick={() => { handleClicks(ele) }}>Apply Now</ApplyTransparentButton>
                                            </div>
                                        </FlexRowWrapper>
                                        <div style={{ textAlign: "start", margin: '0' }}>
                                            <p style={{ fontSize: "small", color: "#535353", margin: '30px 0 0 25px', opacity: '.51' }}>{calculateDay(ele.createdAt) <= 1 ? 'Recently Added' : calculateDay(ele.createdAt) + ' Days Ago'}</p>
                                        </div>
                                    </div>
                                    <Addjob data={value} />
                                </DivTile>
                            )
                        })

                        :
                        <div style={{ padding: '2% 0', textAlign: 'center' }}>No Jobs to show</div>
                    }<Pagination style={{ justifyContent: "center", paddingTop: '2%' }} >{items}</Pagination> </>}
        </>
    )
}

export default JobTile