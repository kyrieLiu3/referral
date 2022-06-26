import http from './http'

// user start 👇
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
// user end 👆

// position start 👇
export const uploadPosition = async (params) => {
  const { data } = await http.post('/position/uploadPosition', params)
  return data
}

export const getUploadedPositions = async (params) => {
  const { data } = await http.get('/position/uploadedPositions', { params })
  return data
}

export const getPosition =  async (params) => {
  const { data } = await http.get('/position/getPosition', { params })
  return data
}

export const updatePosition =  async (params) => {
  const { data } = await http.post('/position/updatePosition', params)
  return data
}
// position end 👆
