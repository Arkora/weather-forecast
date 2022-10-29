import axios from "axios";


const API = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5' })

const key = process.env.REACT_APP_API_KEY


export const getByLocation = (lat,lng) => API.get(`/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`)
 export const getByCity = (term) => API.get(`/weather?q=${term}&appid=${key}&units=metric`)