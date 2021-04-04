import { useState } from 'react'
import styled from 'styled-components'
// import {Wrapper} from '../../components/styledcomponent/styledcomponent'

import ProcessOne from './processone'
import ProcessTwo from './processtwo'
import ProcessThree from './processthree'



const ProgressBar = styled.div`
    display: flex;
    flex-direction: row;
    padding: 3% 0;
`
const Process = styled.div`
    border-radius: 50px;    
    border: 1px solid ${props => props.process ? '#5471E8' : '#F3F3FC'};
    width: 3vw;
    height: 6vh;
    padding-top: 15%;
    color: ${props => props.process ? '#FFFFFF' :  '#5471E8'};;
    background: ${props =>  props.process ? '#5471E8' : '#F3F3FC'};
    font-size: 20px;
    // transaction: all 2s;
    @media(max-width:700px){
        width:9vw;
    }
`

const StyledHr = styled.hr`    
    width: 40%;
    height: 0;
    margin-top: 22px;
    border-top: 2px dashed #5471E8;
`
const Wrapper = styled.div`
    background-color: #FFFFFF;    
    border: 1px solid #0000001F;
    border-radius: 4px;
    padding:1% 30%;
    margin-top: 10px;
    margin: 5% 5% 1% 5%;
    text-align:center;
    @media(max-width:500px){
        padding:5%;
        border:none;
        margin-top: 18%;
        h2{
            font-size: 1.5rem;
        }
    }
`
const ProfileUpdate = () => {

    const [ processOne, setProcessOne ] = useState(true)
    const [ processTwo, setProcessTwo ] = useState(false)
    const [ processThree, setProcessThree ] = useState(false)

    const SetProcess = {
        processOne: setProcessOne,
        processTwo: setProcessTwo,
        processThree: setProcessThree
    }
    
    const onClick1 = () =>{
        setProcessOne(true)
        setProcessTwo(false)
        setProcessThree(false)
    }
    const onClick2 = () =>{
        setProcessTwo(true)
        setProcessOne(false)
        setProcessThree(false)
   }
   const onClick3 = () =>{
        setProcessThree(true)
        setProcessTwo(false)
        setProcessOne(false)
    }

    return (
        // <div style={{ background: "#F2F2F2", padding: '0 5% 1% 5%', height: '100%'}}>
            <Wrapper>
                <h2 style={{color: '#5471E8', fontWeight: 400, margin: 0, fontSize: '22px' }}>Your profile helps you discover new people and opportunities</h2>                
                    <ProgressBar>
                        <div style={{width: '10%',cursor:"pointer"}}><Process process={processOne} onClick={onClick1} >1</Process></div>
                        <StyledHr />
                        <div style={{width: '10%',cursor:"pointer"}}><Process process={processTwo}  onClick={onClick2}>2</Process></div>
                        <StyledHr />
                        <div style={{width: '10%',cursor:"pointer"}}><Process process={processThree} onClick={onClick3}>3</Process></div>
                    </ProgressBar>
                    {processOne && <ProcessOne SetProcess = {SetProcess}/>}
                    {processTwo && <ProcessTwo SetProcess = {SetProcess}/>}
                    {processThree && <ProcessThree SetProcess = {SetProcess}/>}                                    
            </Wrapper>
        // </div>
    )
}

export default ProfileUpdate