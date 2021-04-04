import React from 'react'
// import { FlexRowWrapper, Wrapper } from '../../../components/styledcomponent/styledcomponent'
import styled from 'styled-components'
import CalendarIcon from '../../../assets/dasboardcalendar.svg'

import DefaultJobIcon from '../../../assets/defaultjob.svg'
import { useHistory } from 'react-router'

import {StyledMainContainer, CardRow, StyledCol, Image, ImageDiv, Title, Designation} from './style'

const IconImage = styled.img`
    margin-right: 5px;
    margin-bottom: 0;

`

const RecentJobTile = ({data}) => {
    const history = useHistory()

    const imgConvert = (value) => {                        
        const buff = Buffer (value, 'base64')
        const result = buff.toString('base64')                
        return result
    }

    const handleClick = (e, ele) => {
        history.push({
            pathname: '/viewjob',
            state: {
                ele: ele
            }
        })
    }

    const calculateDay = (value) => {
        const postedDay = new Date(value).toString().slice(4,16)        
        return postedDay
    }

    return (
        <>
        {data && data.map((data, i) => {
            return (

            <StyledMainContainer background = {i % 2===0 ? '#FFFFFF' : '#FAFAFA' } onClick={(e) => handleClick(e,data)} key={i}>
            <CardRow>
                <ImageDiv md={2}>
                    <Image src={data.companylogo ? `data:image/png;base64,${imgConvert(data.companylogo.data)}` : DefaultJobIcon} />
                </ImageDiv>
                <StyledCol>
                    <Title>{data.companyname}</Title>
                    <Designation>{data.title}</Designation>
                </StyledCol>
            </CardRow>
            <CardRow>
                <IconImage src={CalendarIcon} />
                <label style={{ fontSize: '14px', paddingTop: '0.8rem', color: '#6D6D6D'}}>{`Posted on ${calculateDay(data.createdAt)}`}</label>                
            </CardRow>
{/*                                                             
            <FlexRowWrapper style={{ marginTop: '10px', color: '#6D6D6D', fontSize: '13px'}}>
            </CardRow> */}
        </StyledMainContainer>)
        })}
        </>        
    )
}

export default RecentJobTile