import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Container, Row, Col } from 'react-bootstrap'
import Loading from "../../../assets/loading.svg"
import JobListingIcon from "../../../assets/suitcase.svg"
import { BlueButton, FlexRowWrapper } from '../../../components/styledcomponent/styledcomponent'
import axios from "axios"
import CalenderIcon from "../../../assets/experienceicon.svg"
import candidateUserIcon from '../../../assets/candidateperson.svg'
import CandidateEditIcon from '../../../assets/candidateedit.svg'
import { useHistory } from "react-router-dom"
import { CircularProgress } from "material-ui-core"
import { HeaderContainer, HeaderInput, HeaderSelect, PostedJobContainer, LeftPostedJobCol, RightPostedJobCol, CandidatesBtn, JobStatusSelect, DeactivateBtn, FlexRow, JobTitle, StyledSpan, JobDetRow, SpanImg, PostedJobMainRow, FlexRowBtn, SpanDiv } from './style'

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
    background-color: rgba(0,0,0,0.3);
`

const BoxModal = styled.div`
    position: relative;
    top:50%;
    left:50%;
    right: 0;
    transform: translate(-50%,-50%);
    padding: 3%;
    width: max-content;
    overflow-y: auto;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.25);
    border-radius: 4px;
    z-index: 10;    
`

const StyledSpanResponsive = styled(StyledSpan)`    
    @media(max-width: 500px){
        display: none;
    }
`

const ModalText = styled.p`
    color: red;
    width: 30rem;
    text-align: center;
    @media(max-width: 500px) {
        width: 15rem;
    }
`

const BlueButtonModal = styled(BlueButton)`
    width: 10rem;
    @media(max-width: 500px) {
        width: 5rem;
    }
`

const MyJobs = () => {
    const [viewjob, setViewjob] = useState([])
    const [candidateCount, setCandidateCount] = useState()
    const history = useHistory()
    const [status, setStatus] = useState()
    const [button, setButton] = useState()
    const [id, setId] = useState()
    const [active, setactive] = useState(true)
    const [loading, setLoading] = useState()
    const [titles, setTitle] = useState()
    const [location, setLocation] = useState()

    const getCandidateCount = async () => await axios.get('/api/job/all-job-application-count')

    const getData = async () => await axios.get('/api/job/wfall')
        .then(async (res) => {
            getCandidateCount()
                .then(result => {
                    res.data.map(ele => {
                        ele.candidateCount = result.data.find(candidate => ele._id === candidate.jobid).count
                    })
                    console.log(result.data, "candidate count")
                    console.log(res.data, "jobs")
                    setViewjob(res.data)
                    setLoading(false)
                })
                .catch(err => console.log(err.message))
        }).catch((err) => {
            console.log(err.message)
        })

    useEffect(() => {
        getData()
        setLoading(true)
        // getId()
    }, [active])

    const handleEdit = (ele) => {
        console.log(ele)
        history.push({
            pathname: "/admin/jobupdate",
            state: {
                message: ele
            }
        })
    }
    const handleChange = (e, ele) => {
        const data = e.target.value
        console.log(data)
        if (data == "Open") {
            setStatus(true)
        } else if (data == "Close") {
            setStatus(false)
        }
        axios({
            method: 'post',
            url: "/api/job/editstatus",
            data: {
                id: ele._id,
                status: status
            }
        }).then((res) => {
            console.log(res)
        })
    }

    const getId = (viewjob) => {
        if (viewjob) {
            {
                viewjob.map((ele) => {
                    return (
                        setId(...id, ele._id)
                    )
                })
            }
        }
    }

    const handleSubmit = () => {
        console.log('clickedsadsa')
        if (button) {
            axios({
                method: "post",
                url: "/api/job/deactivate",
                data: {
                    id: button._id
                }
            }).then((res) => {
                console.log(res)
                setactive(true)
            })
        }


    }
    const handleRemove = (ele) => {
        console.log('clicked', ele);
        setButton(ele)
        setactive(false)
        // if(ele){
        //     axios({
        //         method:"post",
        //         url:"/api/job/deactivate",
        //         data:{
        //             id:ele._id
        //         }
        //     }).then((res) =>{
        //         console.log(res)

        //         setIsactive(false)
        //     })                                      
        // }
    }
    // const candidateCount = async(id) =>{    
    //     await axios({
    //         url:"/api/job/job-application-count",
    //         method:"post",
    //         data: {id: val}
    //     }).then((res) =>{
    //         console.log(res)            
    //         setId(res.data.cout)
    //     })
    //     .catch(err =>{
    //         console.log(err.message)
    //     })
    // }

    // }
    const handleCandidate = (e, ele) => {
        history.push({
            pathname: '/admin/viewcandidates',
            state: {
                id: ele._id
            }
        })
    }

    if (active) {
        return (

            <>
                <HeaderContainer>
                    <Row>
                        <Col md={4}>
                            <SpanImg width='25px' src={JobListingIcon} />
                            <span style={{ color: '#555555', fontSize: '18px', fontWeight: 600 }}>Job Listing</span>
                        </Col>
                        <Col md={5}>
                            <div>
                                <span>Filter by</span>
                                <HeaderInput placeholder='Job Title' name="titles" value={titles} onChange={(e) => setTitle(e.target.value)} />
                                <HeaderInput placeholder='Location' name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                        </Col>
                        <Col md={3}>
                            <div>
                                <span>Filter</span>
                                <HeaderSelect defaultValue='Posting Date'>
                                    <option>Date</option>
                                </HeaderSelect>
                            </div>
                        </Col>
                    </Row>
                </HeaderContainer>
                <PostedJobContainer>
                    {loading &&
                        <div style={{ textAlign: "center" }}>  <img className="loader" src={Loading}/></div> ||
                        <div style={{ margin: '2% 0' }}>
                            {viewjob && viewjob.filter((ele) => {
                                if (titles === "" || titles === undefined) {
                                    return ele
                                } else {
                                    if (ele.title.toLowerCase().includes(titles.toLowerCase())) {
                                        return ele
                                    } else {
                                        return null
                                    }
                                }
                            }).map((ele, i) => {
                                return (
                                    <PostedJobMainRow>
                                        <LeftPostedJobCol md={7}>
                                            <JobDetRow>
                                                <JobTitle>{ele.title}</JobTitle>
                                            </JobDetRow>
                                            <FlexRow>
                                                <span><SpanImg width='18px' style={{ margin: '0 12px 0 0' }} src={CalenderIcon} /></span>
                                                <StyledSpan>{'Posted On ' + Date(`${ele.createdAt}`).toString().slice(4, 16)}</StyledSpan>
                                            </FlexRow>
                                            <JobDetRow>
                                                <CandidatesBtn onClick={(e) => handleCandidate(e, ele)}>
                                                    <span><SpanImg width='12px' style={{ margin: '0 12px 8px 0' }} src={candidateUserIcon} /></span>
                                                    <StyledSpan>{ele.candidateCount <= 1 ? ele.candidateCount + ' candidate' : ele.candidateCount + ' candidates'}</StyledSpan>
                                                </CandidatesBtn>
                                            </JobDetRow>
                                        </LeftPostedJobCol>
                                        <RightPostedJobCol md={5}>
                                            <FlexRowBtn>
                                                <SpanDiv>
                                                    <StyledSpan style={{ paddingTop: '10px' }}>Job Status</StyledSpan>
                                                </SpanDiv>
                                                <SpanDiv>
                                                    <JobStatusSelect onChange={(e) => { handleChange(e, ele) }} defaultValue='open'>
                                                        {/* <option></option> */}
                                                        <option value='open'>Open</option>
                                                        <option value='close'>Close</option>
                                                    </JobStatusSelect>
                                                </SpanDiv>
                                            </FlexRowBtn>
                                            <FlexRowBtn>
                                                <SpanDiv>
                                                    <StyledSpanResponsive>Edit</StyledSpanResponsive>
                                                    <SpanImg onClick={() => { handleEdit(ele) }} width='20px' src={CandidateEditIcon} />
                                                </SpanDiv>
                                                <SpanDiv>
                                                    <DeactivateBtn onClick={() => { handleRemove(ele) }} disabled={ele.isActive ? false : true}>{ele.isActive ? 'Deactivate' : 'Deactivated'}</DeactivateBtn>
                                                </SpanDiv>
                                            </FlexRowBtn>
                                        </RightPostedJobCol>
                                    </PostedJobMainRow>
                                )
                            })}
                        </div>}
                </PostedJobContainer>
            </>
        )
    } return (
        <ModalWrapper>
            <ModalBackDrop>
                <BoxModal>
                    <div >
                        <ModalText >Make Sure Before Deactivating the Job, After Deactivating You Cant Activate the Job</ModalText>
                        <div style={{ display: "flex", justifyContent: 'space-around' }}>
                            <BlueButtonModal onClick={() => handleSubmit()}>OK</BlueButtonModal>
                            <BlueButtonModal onClick={() => setactive(true)}>Cancel</BlueButtonModal>
                        </div>
                    </div>
                </BoxModal>
            </ModalBackDrop>
        </ModalWrapper>
    )
}

export default MyJobs