import { useState,useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useLocation } from 'react-router'
import { FlexRow } from '../../jobs/myjobs/style'
import { SpinnerDiv, TransparentButton } from '../../../components/styledcomponent/styledcomponent'
import {CircularProgress} from "material-ui-core"
import Loading from "../../../assets/loading.svg"
import CandidateIcon from '../../../assets/candidates.svg'
import CAndidateEmailICon from '../../../assets/candidateemail.svg'
import CAndidatePhoneICon from '../../../assets/candidatephone.svg'
import CandidateDownloadIcon from '../../../assets/candidatedownload.svg'
import GuestAvatar from '../../../assets/guestavatar.svg'

const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    flex-direction: row;       
    // @media(max-width: 500px){
    //     margin-top: 17%;
    // } 
`


const InfoFont = styled.div`
    color: #919191;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    margin-right: 15%;
    margin-top: 3%;
    display: flex;
    height: max-content;

`

const StyledButton = styled.button`
    border: ${props => props.background};
    padding: 1% 3% ;
    color: ${props => props.color};
    background: ${props => props.background};
    border-radius: 4px;
    margin: 5% 1%;
    width: ${props => props.width};
    height:${props => props.height};
    cursor: pointer;
    &:focus{
        outline: none;
    }
    @media(max-width: 500px){
        height: 2rem;
    }
`
const RemoveButton = styled(StyledButton)`
    @media(max-width: 500px){
        height: 3rem;
    }
`

const HeaderWrapper = styled(FlexRowWrapper)`
    background-color: #5471E8;
    color: #FFFFFF;
    padding: 1% 2%;
    margin: 1% 0;
    // border: 1px solid #0000001F;
    border-radius: 4px;
    @media(max-width: 500px){
        background-color: #FFFFFF;
        color: #5471E8;
    }
`

const HeaderIcon = styled.img`
    margin-right: 1%;
    margin-bottom: 12px;
    @media(max-width: 500px){
        display: none;
    }
`

const CardWrapper  = styled(FlexRowWrapper)`
    display: flex;
    flex-direction: row;
    @media(max-width: 500px){
        flex-direction: column;
    }
`

const FlexBtnWrapper = styled(FlexRowWrapper)`
    width: 40%;
    @media(max-width: 500px){
        width: 100%;
        // flex-direction: column;
    }
`

const FlexCardWrap = styled(FlexRowWrapper)`
    width: 60%;
    flex-direction: column;
    @media(max-width: 500px){
        width: 100%;
    }
`
const ImageDiv = styled.div`
    width: 75px;
    margin-right: 5%;  
    @media(max-width: 500px){
        width: 100%;        
        margin-bottom: 1%;
    }
`

const FLexCardRowOne = styled(FlexRowWrapper)`
    width: 25%;
    @media(max-width: 500px){
        width: 100%;
        flex-direction: column;
        text-align: center;
        justify-content: center;
    }
`

const StyledImgIcon = styled.img`
    margin-right: 8%;
    width: 15px;
`

const FLexCardTwoWrap = styled(FlexRowWrapper)`
    width: 15rem;
    justify-content: space-between;
    text-align: end;
    @media(max-width: 500px){
        width: 100%;
        text-align: center;
        // padding: 0 8%;
    }
`

const TitleDiv = styled.div`
    width: 20rem;
    @media(max-width: 500px){
        width: 100%;
    }
`

const CandidatesContainer = styled.div`
    margin: 5% 5% 1% 5%;
    @media(max-width: 500px){
        margin: 20% 5% 1% 5%;
    }
`

const Candidates = () => {
    const location = useLocation()    
    const [data,setData]=useState()
    const [loading, setLoading] = useState(false)

    const getData = async() => await axios.post('/api/job/get-job-application', {id: location.state.id})
    .then( res => {                          
        setData(res.data)
        setLoading(false)
    })
    .catch(err => {
        console.log(err.message)
    })

    const imgConvert = (value) => {
        const buff = Buffer(value, 'base64')
        const result = buff.toString('base64')
        return result
    }


    useEffect(() => {
        setLoading(true)
        getData()  
    }, [])

    if(loading){
        return (
            <SpinnerDiv>
                {/* <CircularProgress color="secondary"  /> */}
                <img className="loader" src={Loading}/>
            </SpinnerDiv>
        )
    }

    return (
        <>        
        

            <CandidatesContainer >
                <HeaderWrapper>
                    <HeaderIcon src={CandidateIcon} />
                    <h4>Candiates</h4>
                </HeaderWrapper>            
                {data && data.map((ele,i) => {
                return (
                <div key={i} style={{backgroundColor: `#FFFFFF`, padding: '3%', border: '1px solid #0000001F', borderRadius: '4px'}}>
                    <CardWrapper>
                        <FlexCardWrap >
                            <FLexCardRowOne style={{justifyContent:'space-between', }}>
                                <ImageDiv ><img style={{width: '75px', borderRadius: '8px'}} src={ele.displayimage ? `data:image/png;base64,${imgConvert(ele.displayimage)}` : GuestAvatar} /></ImageDiv>
                                <TitleDiv>
                                    <div style={{color: '#555555', fontWeight: 500, marginBottom: '15px'}}>{ele.name}</div>
                                    <div style={{ color: '#A8A8A8', fontWeight: 400}}>(Ui designer)</div>
                                </TitleDiv>
                            </FLexCardRowOne>                                                
                            <FLexCardTwoWrap>
                                <InfoFont><StyledImgIcon src={CAndidateEmailICon} /><label>{ele.email}</label></InfoFont>
                                <InfoFont><StyledImgIcon src={CAndidatePhoneICon} /><label>{ele.phone}</label></InfoFont>
                            </FLexCardTwoWrap>                
                        </FlexCardWrap>
                        <FlexBtnWrapper>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '75%'}}>
                                <StyledButton color={'#2680EB'} background={'#E5E5FF'}  height={'3rem'} width={'65%'}>Download CV<StyledImgIcon style={{ marginLeft: '3%'}} src={CandidateDownloadIcon} /></StyledButton>
                                <StyledButton color={'#FFFFFF'} background={'#555555'}  height={'3rem'} width={'35%'}>Message</StyledButton>
                            </div>
                            <div style={{ width: '25%'}}><RemoveButton color={'#D12424'} height={'4.5rem'} background={'#FFFFFF'} width={'100%'} >Remove</RemoveButton> </div>
                        </FlexBtnWrapper>
                    </CardWrapper>
                </div>
                )
            })}
            </CandidatesContainer>
        
        </>
        
    )
}

export default Candidates