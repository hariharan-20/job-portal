import styled from 'styled-components'
import logo1 from "../../logo1.svg"
const DIV = styled.div`
    background-image:url(${logo1});
    background-size: cover;
    background-repeat: no-repeat;    
    width: 46%; 
    @media (max-width: 768px) {
        display:none;
      }   
`
// const DIVCIRCLE = styled.div`
//       width: 100px;
//       height: 100px;
//       margin-top: 10%;
//       -webkit-border-radius: 25px;
//       -moz-border-radius: 25px;
//       border-radius: 50px;
//       background: #617cf2;
// `

const TITLE = styled.h1`
    color: white;
    padding: 52% 15%;    
    text-align:center;    
    font-size: 35px;
    font-weight: 600;
    line-height: 55px;
`
const SubTitle = styled.span`
    color: white;       
    text-align:center;
    font-weight: 100;
`

function LeftBoardArt(params) {
    return (

        <DIV>            
            <TITLE>Make the most of your <SubTitle>professional life</SubTitle></TITLE>
        </DIV>
    )
}
export default LeftBoardArt