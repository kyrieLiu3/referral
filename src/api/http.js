import Axios from 'axios'
import { resolveResHeader } from '../utils'
const baseURL = 'http://localhost:8080/api'
const http = Axios.create({
  baseURL,
  timeout: 60000,
})
const whiteList = ['/user/signin', '/user/signup', '/user/validateEmail']

// interceptor for every http request
http.interceptors.request.use((config) => {
  // success
  console.log('REQUEST SUCCESSFULLY', config)
  // add authorization field if url not included in white lists
  if (!whiteList.includes(config.url)) {
    const token = localStorage.getItem('token') || ''
    token && (config.headers.common['Authorization'] = token)
  }
  return config
})

// interceptor for ervry http response
http.interceptors.response.use(
  response => {
    // success
    console.log('RESPONSE SUCCESSFULLY', response)
    if (response.config.responseType === 'blob') {
      const filename = resolveResHeader(response.headers['content-disposition'])['filename']
      const _response = { data: response.data, filename: decodeURIComponent(filename).replace(/"/g, '') }
      return Promise.resolve(_response)
    }
    const { status, data: { code } } = response
    if (status === 200 && code === 0) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response.data.data)
    }
  },
  error => {
    // fail
    console.log('RESPONSE FAIL', error)
    const { response: { status, data } } = error
    if (status === 404) {
      return Promise.reject('Request Not Found')
    } else {
      return Promise.reject(data)
    }
  }
)

export default http
