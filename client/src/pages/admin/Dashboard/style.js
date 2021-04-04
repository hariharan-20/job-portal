import styled from 'styled-components'
import {Container, Row, Col} from 'react-bootstrap'

export const CardDet = styled(Col)`        
    padding: 0;
    padding-top: 1rem;
    padding-left: 2rem;
    @media(max-width: 500px){
        padding: 0;   
        margin-top: 5%;     
    }
`

export const CardLabel = styled(Row)`
    color: #ACACAC;
    font-weight: 500;
    padding: 0;
    @media(max-width: 500px){        
        justify-content: center;
    }
`

export const CardNo = styled(Row)`
    font-weight: 600;
    color: #535353;
    // : end
    padding: 0;
    @media(max-width: 500px){     
        justify-content: center;
    }
`

export const PostNewCard = styled.div`    
    border: 2px dashed #5471E8;
    background-color: #FFFFFF;    
    padding: 5% 0;
    width: 92%;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
    @media(max-width: 500px){
        margin: 0;        
        display: flex;
        justify-content: space-evenly;
        padding: 1% 0;    
        background-color: #EAF3FF;   
    }
`

export const RecentJobDiv = styled.div`
    overflow-y: scroll;
    height: 50vh;
    ::-webkit-scrollbar {
        width: 5px;
    }            
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
            
    ::-webkit-scrollbar-thumb {
        background: #5471E8; 
        border-radius: 10px;
    }
`

export const BlueButton = styled.button `
    width: 100%;
    display: block;
    padding-top: 11px;
    padding-bottom: 11px;
    border: none;
    border-radius: 4px;
    color: white;
    background: #5471E8;
    font-size: small;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    @media(max-width: 500px){
        display: none;
    }
`

export const StyledContainer = styled(Container)`  
    padding: 0;    
`
export const StyledMainContainer = styled(Container)`
    margin: 1% auto; 
    margin-top: 5%;   
    padding: 0 5%;
    @media(max-width: 500px){
        margin-top: 18%;
    }
`


export const StyledMainRowWrapper = styled(Row)`
    padding:0;
`

export const StyledCardRow = styled(Row)`
`

export const StyledRow = styled(Row)`
    padding: 4% 15%;
    @media(max-width: 500px){
        padding: 12% 15%;
    }
`
export const StyledCol = styled(Col)`
    padding: 0;
    margin: 0;
    margin-right: 2%;
`
export const StyledColWrapper  = styled(Col)`
    background-color: #FFFFFF;   
    padding: 0;
    margin: 0 2% 2% 2%;    
    border: 1px solid #0000001F;
    border-radius: 4px; 
    padding: 0;
    text-align: center;
    @media(max-width: 500px){
        width: 50%;
        margin: 2%;
    }
`
export const StyledColWrapperPost  = styled(Col)`                            
    padding: 0;
    margin: 0 2%;
    text-align: center;
    @media(max-width: 500px){
        width: 50%;
        margin: 2%;
    }
`

export const StyledMainColWrapper = styled(Col)`        
    padding: 1% 0;
    margin: 0 1%;
    @media(max-width: 500px){
        margin: 0 8%;
    }
`

export const RecentJobHeader = styled.div`
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    padding: 2%;
    font-size: 15px;
    font-weight: 550;
    color: #555555;
    border: 1px solid #0000001F;
    border-radius: 4px;
`
export const ViewSpan = styled.div`
    display: none;
    cursor: pointer;
    @media(max-width: 500px){
        display: block;
    }
`

export const PostImg = styled.img`
    width: 35px;
    @media(max-width: 500px){
        width: 25px;
        margin-bottom: 0;
    }
`

export const PostLabel = styled.div`
    color: #5471E8;
    fontSize: 20px;
    fontWeight: 400;
    margin: 2% 0;    
`

export const UserCardDiv = styled.div`
    
    @media(max-width: 500px){
        display: none;
    }
`