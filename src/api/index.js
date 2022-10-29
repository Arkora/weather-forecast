import axios from "axios";

const API = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5' })

const key = 'febc97a3a3906cbd033f05dcce77cd4c'

export const getByLocation = (lat,lng) => API.get(`/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`)
 export const getByCity = (term) => API.get(`/weather?q=${term}&appid=${key}&units=metric`)