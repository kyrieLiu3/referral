import http from './http'

export const httpSignup = async (params) => {
  const { data } = await http.post('/user/signup', params)
  return data
}

export const validateEmail = async (params) => {
  const { data } = await http.get('/user/validateEmail', { params })
  return data
}

export const httpSignin = async (params) => {
  const { data } = await http.post('/user/signin', params)
  return data
}

export const getUserData = async () => {
  const { data } = await http.get('/user/getUserData')
  return data
}

export const changePassword = async (params) => {
  const { data } = await http.post('/user/changePassword', params)
  return data
} 