import Axios from 'axios'
import { resolveResHeader } from '../utils'
import { resetRecoil } from '../store/utils'
import { userState } from '../store'
const baseURL = 'http://localhost:8080/api'
const http = Axios.create({
  baseURL,
  timeout: 60000,
})
const whiteList = ['/user/signin', '/user/signup', '/user/validateEmail']
// Error Code ⬇️
const SESSION_TIMEOUT = 101

// interceptor for every http request
http.interceptors.request.use(config => {
  // success
  console.log('REQUEST SUCCESSFULLY', config)
  // add authorization field if url not included in white lists
  if (!whiteList.includes(config.url)) {
    const token = localStorage.getItem('token')
    token && (config.headers.common['Authorization'] = `Bearer ${token}`)
  }
  return config
})

// interceptor for ervry http response
http.interceptors.response.use(
  response => {
    // success
    console.log('RESPONSE SUCCESSFULLY', response)
    if (response.config.responseType === 'blob') {
      const filename = resolveResHeader(
        response.headers['content-disposition']
      )['filename']
      const _response = {
        data: response.data,
        filename: decodeURIComponent(filename).replace(/"/g, ''),
      }
      return Promise.resolve(_response)
    }
    const {
      status,
      data: { code, data },
    } = response
    if ((status === 200 || status === 304) && code === 0) {
      return Promise.resolve(response)
    } else {
      if (code === SESSION_TIMEOUT) {
        resetRecoil(userState)
      }
      return Promise.reject(data)
    }
  },
  error => {
    // fail
    console.log('RESPONSE FAIL', error)
    const {
      response: { status, data },
    } = error
    if (status === 404) {
      return Promise.reject('Request Not Found')
    } else {
      return Promise.reject(data)
    }
  }
)

export default http
