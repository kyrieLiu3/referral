import http from './http'

export const httpSignup = async (params) => {
  const { data } = await http.post('/user/signup', params)
  return data
}

export const validateEmail = async (params) => {
  const { data } = await http.get('/user/validateEmail', { params })
  return data
}