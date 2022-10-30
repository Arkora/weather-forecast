import React from 'react'


const Weather = ({city,temperature,date,humidity,weather,loaded}) => {
    
  return (
    <div className='block p-6 '>
        {loaded? 
            <>
                <div className='grid md:grid-cols-3 gap-2 mt-6 '>
                <div className='p-6'>
                    <img src={require(`../../public/assets/${weather}.png`)} alt="" />
                </div>
                <div>
                    <h1 className='text-3xl font-bold'>Temperature</h1>                    
                    <h1 className='p-6 text-2xl'>{temperature}°C </h1>    
                </div>
                <div>
                    <h1 className='text-3xl font-bold'>Humidity</h1>
                    <h1 className='p-6 text-2xl'>{humidity}%</h1>
                </div>            
            </div>
            <div className='md:mt-32'>
                <h1 className='text-4xl font-mukta font-bold'>{city}</h1>
            </div>
            </>
         :<div className='flex mt-24 justify-center'> <h1 className='text-4xl font-bold'>Loading...</h1></div>}
        
    </div>
  )
}

export default Weather