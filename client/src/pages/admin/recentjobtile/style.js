import styled from 'styled-components'
import {Container, Row, Col, Button} from 'react-bootstrap'

export const StyledMainContainer = styled(Container)`    
    padding: 5%;
    background-color: ${props => props.background};
    cursor: pointer;
`

export const CardRow = styled(Row)`
`

export const StyledCol = styled(Col)`
`

export const ImageDiv = styled(Col)`
    @media(max-width: 500px){
        width: 20%;
    }
`

export const Image = styled.img`
    width: 50px;
    border-radius: 4px;
    object-fit: contain
`
export const StyledRow = styled(Row)`

`

export const Title = styled.div`
    color: #535353;
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
`

export const Designation = styled.div`
    color: #2680EB;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
`