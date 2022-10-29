import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import SearchBar from './components/search/SearchBar'
import Weather from './components/main/Weather'
import { BsFillArrowLeftCircleFill as Left } from "react-icons/bs"
import { BsFillArrowRightCircleFill as Right } from "react-icons/bs"
import useGeoLocation from './hooks/useGeolocation'
import {getByLocation,getByCity} from './api/index'

const Container = styled.div`
  background: #304352;  
  background: -webkit-linear-gradient(to right, #d7d2cc, #304352);  
  background: linear-gradient(to right, #d7d2cc, #304352);
  width: 800px;
  height: 475px; 
  display: flex;
  margin: auto;
  border-radius: 30px;

  #search-bar{
    margin-left: 255px;
  }
  
`
const Wrapper = styled.div`
  display:flex ;
  flex-direction:row ;
  
  #center{
    margin-left: 40px;
    margin-top: 75px;
    width: 725px;
    height: 330px;
    background: rgba( 203, 200, 200, 0.15 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 0px );
    -webkit-backdrop-filter: blur( 0px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }

  #left{
    margin-top: 220px;
  }
  #right{
    margin-top: 220px;
    margin-left: 20px;
  }
`


const App = () => {
  const location = useGeoLocation();
  const [data, setData] = useState({city:"",weather:"",temperature:"",humidity:"",date:"",message:""})
  const [loaded, setLoaded] = useState(false)
  const [term,setTerm] = useState("")
  

  const fetchData = async () =>{
    try {
      const {data} = await getByLocation(location.coordinates.lat,location.coordinates.lng)
      setData({city:data.name,weather:data.weather[0].main,temperature:Math.round(data.main.temp),humidity:data.main.humidity,date:new Date(data.dt)})
      setLoaded(true)
      
    } catch (error) {
      console.log(error.message)
    }
    
  }

  const fetchDataBySearch = async () =>{
    try {
      const {data} = await getByCity(term)      
      setData({city:data.name,weather:data.weather[0].main,temperature:Math.round(data.main.temp),humidity:data.main.humidity,date:new Date(data.dt)})
      setLoaded(true)
    } catch (error) {
      if(error.response.status === 404){
        setData({...data,message:error.message})
      }
      console.log(error.message)
    }
  }

  

  useEffect(() =>{  
      fetchData()
      if (term)
      {
        fetchDataBySearch()
      }
      
  },[location,term])
  
  

  return (   
    <Container>     
      <div>
        <div id='search-bar'>
          <SearchBar setTerm={setTerm}/>             
        </div>     
        <Wrapper>
          {/* <div id='left'><Left onClick={fetchData} /></div> */}
          <div id='center'>
            <Weather 
            city={data.city}
            temperature={data.temperature}  
            weather={data.weather}
            humidity={data.humidity}
            date={data.date}
            loaded={loaded}
            />
          </div>
          {/* <div id='right'><Right /></div> */}
        </Wrapper>        
      </div>
    </Container>
  )
}

export default App