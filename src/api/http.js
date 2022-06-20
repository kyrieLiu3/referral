import Axios from 'axios'
const baseURL = 'http://localhost:8080/api'
const http = Axios.create({
  baseURL,
  timeout: 60000,
})

// interceptor for ervry http response
http.interceptors.response.use(
  response => {
    // success
    console.log('success', response)
    const { status, data: { code } } = response
    if (status === 200 && code === 0) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response.data.data)
    }
  },
  error => {
    // fail
    console.log('fail', error)
    const { response: { status, data } } = error
    if (status === 404) {
      return Promise.reject('Request Not Found')
    } else {
      return Promise.reject(data)
    }
  }
)

export default http
