import Axios from 'axios'
const baseURL = 'http://localhost:8080/api'
const http = Axios.create({
  baseURL,
  timeout: 60000
})

export default http
