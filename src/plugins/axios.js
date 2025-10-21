import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // URL directe, pas de proxy
  timeout: 10_000,
})

export default api
