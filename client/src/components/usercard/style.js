import styled from 'styled-components'
import {Container, Row, Col, Button} from 'react-bootstrap'

export const TransparentButton = styled(Button)`
    background-color: #FFFFFF;
    border: 1px solid #5371E8;
    border-radius: 3px;
    color: #5471E8;
    width: 60%;
    padding: 2%;
    margin: 2% 0;
    cursor: pointer;
    &:focus{
        outline: none;
    }
`

export const StyledContainer = styled(Container)`
    border: 1px solid #0000001F;
    border-radius: 4px;
    padding: 5% 5%;
    background-color: #FFFFFF;

`

export const StyledRow = styled(Row)`
    justify-content: center;
    display: flex;
    flex-direction: column;    
`

export const StyledCol = styled(Col)`

`

export const Image = styled.img`
    width: 65px;
    border-radius: 44%;
    object-fit: contain
    background-color: #ACACAC;        
`