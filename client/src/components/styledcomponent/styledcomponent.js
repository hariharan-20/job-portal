import styled from 'styled-components'

export const TextField = styled.input `
    height: 2.5rem;
    width: 24rem;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 6px;    
    &:focus{        
        outline: none;        
    }    
`
export const TextAreaField = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 6px;
    resize: none;    
    &:focus{        
        outline: none;        
    }
`
export const SelectField = styled.select `
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 6px;    
    &:focus{        
        outline: none;        
    }
`

export const BlueButton = styled.button `
    width: 100%;
    padding-top: 11px;
    padding-bottom: 11px;
    border: none;
    border-radius: 8px;
    color: white;
    background: #5471E8;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    @media(max-width: 500px) {
        padding: 2%;
    }
`

export const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    flex-direction: row;       
    @media(max-width: 500px){
        margin-top: 17%;
    } 
`

export const SpinnerDiv = styled.div`
    text-align: center;
    margin-top: 5%;
    @media(max-width: 500px) {
        margin-top: 20%;
    }
`

export const FormLabel = styled.label `
    color: #7C7C7C;
    font-size: small;
`
export const TransparentButton = styled.button`
    background-color: #FFFFFF;
    border: 1px solid #5371E8;
    border-radius: 3px;
    color: #5471E8;
    // width: 60%;
    padding: 2%;
    // margin: 2% 0;
    cursor: pointer;
    &:focus{
        outline: none;
    }
`

export const Wrapper = styled.div`
    background-color: #FFFFFF;    
    padding: 10% 5%;
    border: 1px solid #0000001F;
    border-radius: 4px;
`

export const AvatarDiv = styled.div`    
    color: #535353;
    background-color: #0000001F;
    margin: 0 29%;    
    background-color: #0000001F;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    padding: 0;
    margin-bottom: 38px;
`