import React,{useEffect,useState} from 'react'
import useGeoLocation from './hooks/useGeolocation'
import {getByLocation,getByCity} from './api/index'
import Search from './components/Search'
import Weather from './components/Weather'





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
    <div className='bg-slate-500 h-screen w-full font-nunito text-slate-50'>
        <div className=' flex items-center  justify-center h-screen'>               
            <div className='bg-slate-100 backdrop-filter rounded-lg backdrop-blur-lg bg-opacity-10 w-3/4 h-3/4 '>
              <div className='flex justify-center mt-4'>
                  <Search setTerm={setTerm} />
              </div>
              <div className='mt-6'>
                  <Weather 
                  city={data.city}
                  temperature={data.temperature}  
                  weather={data.weather}
                  humidity={data.humidity}
                  date={data.date}
                  loaded={loaded}
                  />
              </div>
            </div>        
        </div>   
    </div>
  )
}

export default App