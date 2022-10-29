import React from 'react'
import { Date,City,Container } from './styles'


const Weather = ({city,temperature,date,humidity,weather,loaded}) => {

 const toString = String(date)
  
  return (    
    <div>
      {loaded ? (
    <>
      <Date>Now</Date>
        <Container>
          <div id='weather'><img src={require(`../../../public/assets/${weather}.png`)} alt=""></img></div>
          <div id='temperature'>{temperature}°C</div>
          <div id='humidity'>{humidity}%</div>
        </Container>
        <City>{city}</City></>) : (<h1>Loading...</h1>)}

    </div>
  )
}

export default Weather