import styled from 'styled-components'

import JobTile from '../../components/job/jobtile'
import TopSearchBar from '../../components/topsearch/topsearchbar'
import WelcomeGuestCard from '../../components/welcomeguest/welcomeguest'
import UserCard from '../../components/usercard/usercard'
import { useEffect, useState } from 'react'





const JobWrapperDiv = styled.div`
    margin-Right: 10px;
    background: white;
    border: .01px solid #d1d1d1;
    border-radius: 4px;
    width:75%;
    overflow:hidden;
    @media (max-width: 768px) {
        width:100%;
        
      } 
`

const HomeWrapper = styled.div`
    text-align: center;    
    padding: 1% 5%;
    margin-top: 5%;
    @media (max-width: 768px) {
        padding:0% 0%;        
        margin-top: 16%;
      } 
`
const Div =styled.div`
     width:25%;
     @media (max-width: 768px) {
        width:0%;
        display:none;
      } 
`
const StyleDiv =styled.div`
 padding:15px;
 text-align:start;
 color:#ffffff;
 font-weight:500;
 font-size:18px;
  background-color:#5471E8;
  @media (max-width: 768px) {
    background-color:white;
    color:black;
    border:none;
  } 
`
const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    flex-direction: row;       
    // @media(max-width: 500px){
    //     margin-top: 17%;
    // } 
`

const Home = () =>  {   
    const userType = localStorage.getItem('userType')
    const [isLoggedIn, setIsLogged] = useState(false)
    // const length = useSelector(searchLength)
    // const [searchLen,setA] = useState()    
    // const getuserType = async() => await axios.get('/api/user/isAuthenticated')
    // .then(res => {        
    //     setType(res.data.userType)
    // })
    // .catch(err => {
    //     console.log(err )
    //     setType(null)
    // })

    useEffect(() => {               
        if(userType){
            setIsLogged(true) 
        }else{
            setIsLogged(false)
        }              
    },[isLoggedIn, userType])

    return (
        <>        
        <HomeWrapper>            
            <TopSearchBar />                
                 <FlexRowWrapper style={{ marginTop: "10px" }}>
                     <JobWrapperDiv>                       
                        <JobTile />                        
                    </JobWrapperDiv>
                    <Div>
                        {!isLoggedIn && <WelcomeGuestCard />}
                        {isLoggedIn && <UserCard />}
                    </Div>
                </FlexRowWrapper>                
        </HomeWrapper>                
        </>
    )
}

export default Home