import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import GuestAvatar from '../../assets/guestavatar.svg'
import { TransparentButton } from '../styledcomponent/styledcomponent'
export const Wrappers = styled.div`
    background-color: #FFFFFF;    
    padding: 10% 5%;
    border: 1px solid #0000001F;
    border-radius: 4px;
    @media (max-width: 768px) {
        display:none;
      }   
`
export const AvatarDiv = styled.div`    
    color: #535353;
    background-color: #0000001F;
    margin: 0 33%;    
    background-color: #0000001F;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    padding: 0;
    margin-bottom: 38px;
`
const WelcomeGuest = () => {
    const history = useHistory()
    return (
        <Wrappers>
            <AvatarDiv style={{ marginBottom: '5px'}}>
                <img style={{ padding: '3px', width: '75px', height:'75px', objectFit: 'cover' }} src={GuestAvatar} />
            </AvatarDiv>
            <h3 style={{ color: '#5471E8', fontWeight: 400, margin: '3% 0' }}>Welcome guest!</h3>
            <TransparentButton onClick={() => history.push({ pathname: "/signup" })}>Register for free</TransparentButton>
        </Wrappers>
    )
}
export default WelcomeGuest