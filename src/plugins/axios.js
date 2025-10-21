import axios from 'axios'

const api = axios.create({
  baseURL: 'https://restcountries.com', // URL directe, pas de proxy
  timeout: 10_000,
})

export default api
