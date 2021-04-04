import React,{useState,useEffect} from "react"
import styled from 'styled-components'
import LocationIcon from '../../assets/locationicon.svg'
import SearchIcon from '../../assets/searchicon.svg'
import { useDispatch, useSelector } from "react-redux"
import { SearchTextField } from '../styledcomponent/styledcomponent'
import {searchBar,search} from "../../Redux/Features/search"
// import debounce from "loadash.debounce"
import "./topsearch.css"
import axios from "axios"
const DivSearchBar = styled.div`
    background: white;
    width: 100%;    
    display: flex;
    // margin-top: 10px;
    justify-content: space-evenly;
    align-items: center;
    padding: 4% 0;
    padding-bottom: 2%;
    border: .01px solid #d1d1d1;
    border-radius: 4px;
    @media(max-width:500px){
        height:10%;
        border:none;   
        padding: 0;    
    }
`
export const BlueButton = styled.button `
    width:15%;
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
    @media(max-width:500px){
       width:25%;
    }

`
const InputField = styled.input`
    width: 90%;
    border: none;
    padding-left: 10px;
    font-size: 13px;    
    &:active{
        border: none;
    }
    &:focus {
        outline: none;
    }
`
const FlexRowWrapper = styled.div `
    display: ${props => props.isLogged ? 'none' : 'flex' };
    flex-direction: row;       
    @media(max-width: 500px){
        margin-top: 5%;
    } 
`

function TopSearchBar() {
    // const [skills,setSkills] = useState()
    // const [location,setLocation] =useState()
    const [display,setDisplay] = useState()
    const [items,setItems]=useState()
    const [arr,setArray]=useState()
    const [data, setData] = useState({
        skill: '',
        location: ''
    })
    

    const dispatch = useDispatch()
    const handleClick =() =>{
        if(data.skill || data.location ){            
            dispatch(search(data))
            setDisplay(false)
        }
         
    }

    useEffect(async () =>{
     await axios({
          method:"get",
          url:"/api/job/wfall"
      })
      .then((res)=>{
          setItems(res.data)                 
      })          
    },[])

    const handleChange = e =>{
        setData({
            [e.target.name]:e.target.value
        })
        
        if(e.target.name === 'skill'){
            if(e.target.value.length > 0){
                setDisplay(true)
            }
            if(e.target.value <=0){
                setDisplay(false)
                dispatch(search(e.target.value))
            }
        }                            
    }

    const handleTake = (e) =>{                
        setData({
            ...data,
            skill : e.target.outerText
        })
        // setSkills(e.target.outerText)        
        // dispatch(search(data))
        setDisplay(false)
    }

    return (
        <DivSearchBar>
            <div  className="search-container">
                <h2 style={{ color: "#5471E8", fontWeight: 300, fontSize: '28px', marginBottom: '30px' }}>Search for Job here!</h2>
                <div style={{ textAlign: "center" }}>
                    <FlexRowWrapper className="flex-container">
                    <div className="searchByCompany">
                        <div className="search-innerone">                           
                            <img style={{width: '4%', color: 'black'}} src={SearchIcon} />
                            <InputField placeholder="Search by Job Title or Company" name="skill" value={data.skill} onChange={(e)=>{handleChange(e)}}/>                                                        
                        </div>
                        {display && 
                        <div className="auto-complete">
                          {items && items.filter(val =>{
                              if(data.skill == ""){
                                  return val
                              }else if(val.title.toLowerCase().includes(data.skill.toLowerCase())){
                                  return val
                              }
                          }).map((ele) =>{
                              return(
                                  <div style={{cursor:"pointer"}} onClick={(e) => handleTake(e)}>
                                      <p>{ele.title}</p>
                                  </div>
                              )
                          })}
                            
                      </div>}
                      </div>
                        <div  className="search-innertwo">
                            <img style={{width: '8%',marginRight: '-4px', color: 'black'}} src={LocationIcon} />
                            <InputField placeholder="City" value={data.location} name="location"   onChange={(e) => {handleChange(e)}}/>
                        </div>
                        <BlueButton className="search-button" onClick={() => handleClick()}>Find Jobs</BlueButton>
                    </FlexRowWrapper>
                </div>
            </div>
        </DivSearchBar>
    )
}

export default TopSearchBar