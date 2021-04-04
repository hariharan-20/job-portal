import styled from 'styled-components'
import {Container, Row, Col, Button} from 'react-bootstrap'

export const HeaderContainer = styled(Container)`
    background-color: #FFFFFF;
    border: 1px solid #0000001F;
    border-radius: 4px;
    margin-top: 5%;
    margin-bottom: 1.5rem;
    padding: 1rem 3rem;
    @media(max-width: 500px){
        display: none;
    }
`

export const HeaderInput = styled.input`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 1px #00000029;
    border: 0.20000000298023224px solid #AFAFAF;
    border-radius: 4px;
    padding: 0.2rem 1rem;
    margin: 0 0.2rem;
    width: 40%;
    &:focus{
        outline: none;
    }
`
export const HeaderSelect = styled.select`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 1px #00000029;
    border: 0.20000000298023224px solid #AFAFAF;
    border-radius: 4px;
    padding: 0.2rem 1rem;
    margin: 0 0.2rem;
    width: 65%;
    height: 2rem;
    &:focus{
        outline: none;
    } 
`

export const PostedJobContainer = styled(Container)`
    background-color: #FFFFFF;
    @media(max-width: 500px){
        margin-top: 18%;
    }

`

export const PostedJobRow = styled(Row)`

`

export const LeftPostedJobCol = styled(Col)`
    @media(max-width: 500px){
        width: 60%;
        padding:0;
    }
`

export const RightPostedJobCol = styled(Col)`
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    @media(max-width: 500px){
        width: 40%;
        flex-direction: column-reverse;
        padding: 0;
    }
`

export const CandidatesBtn = styled(Button)`    
    background-color: #E5E5FF;
    border: none;
    width: 23%;
    font-size: 14px;
    color: #5471E8;
    border-radius: 4px;
    padding: 0.2rem 0;
    &:focus{
        outline: none;
        background-color: #E5E5FF;
        color: #5471E8;
        box-shadow: none;
    }
    &:hover{
        background-color: #E5E5FF;
        color: #5471E8;
    }  
    @media(max-width: 500px){
        width: 65%;
    }  
`

export const JobStatusSelect = styled.select`    
    margin: 0 0.5rem;
    box-shadow: 0px 1px 1px #00000029;
    border: 0.20000000298023224px solid #AFAFAF;
    border-radius: 4px;
    outline: none;
    background-color: #FFFFFF;
    color: #2680EB;
    height: 1.8rem;   
    padding: 0 5%; 
`

export const DeactivateBtn = styled(Button)`
    background: none;
    color: #D12424;
    border: none;
    box-shadow: none;
    outline: none;
    padding: 0;
    height: 2rem;
    &:focus {
        background: none;
        color: #D12424;
        box-shadow: none;
    }
    &:hover{
        background: none;
        color: #D12424;
    }
    &:disabled{
        background: none;
        color: #D12424;
    }
    @media(min-width: 501px){
        margin-left: 2rem;
    }

`

export const FlexRow = styled(Row)`
    display: flex;
    margin: 0.5rem 0;
    width: 35%;
    justify-content: space-between;
    @media(max-width: 500px){
        width: 91%;
    }
`

export const FlexRowBtn = styled(Row)`
    margin: 0.5rem 0;
    width: 50%;
    @media(max-width: 500px){
            display: flex;
            justify-content: space-between;
            width: 100%;        
    }
`

export const JobTitle = styled.label`
    color: #3C3C3C;
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    @media(max-width: 500px){
        font-size: 14px;
    }
`

export const StyledSpan = styled.span`
    padding-top: 5px;
    margin-left: -5px;
    @media(max-width: 500px){
        width: 12rem;
        font-size: 13px;
    }
`
export const JobDetRow = styled(Row)`
    margin: 0.5rem 0;
`

export const SpanImg = styled.img`
    width: ${props => props.width};
    margin-right: 12px;
    margin-left: 10px;
    margin-bottom: 10px;
    padding-top: 5px;
    cursor: pointer;
`

export const PostedJobMainRow = styled(Row)`    
    border: 1px solid #0000001F;
    border-radius: 4px;
    // margin-top: 1.5rem;
    // margin-bottom: 1.5rem;
    padding: 0.5rem 3rem;

    @media(max-width: 500px){
        font-size: 13px;
    }
`

export const SpanDiv= styled.div`
    padding-top: 5px;
    @media(max-width: 500px){
        width: 50%;
    }
`