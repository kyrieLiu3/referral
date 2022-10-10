import http from './http'

// user start 👇
export const httpSignup = async params => {
  const { data } = await http.post('/user/signup', params)
  return data
}

export const validateEmail = async params => {
  const { data } = await http.get('/user/validateEmail', { params })
  return data
}

export const httpSignin = async params => {
  const { data } = await http.post('/user/signin', params)
  return data
}

export const getUserData = async () => {
  const { data } = await http.get('/user/getUserData')
  return data
}

export const changePassword = async params => {
  const { data } = await http.post('/user/changePassword', params)
  return data
}
// user end 👆

// position start 👇
export const uploadPosition = async params => {
  const { data } = await http.post('/position/uploadPosition', params)
  return data
}

export const getUploadedPositions = async params => {
  const { data } = await http.get('/position/uploadedPositions', { params })
  return data
}

export const getPosition = async params => {
  const { data } = await http.get('/position/getPosition', { params })
  return data
}

export const updatePosition = async params => {
  const { data } = await http.post('/position/updatePosition', params)
  return data
}

export const getPositionsByConditions = async params => {
  const { data } = await http.get('/position/getPositionsByConditions', {
    params,
  })
  return data
}
// position end 👆

// resume start 👇
export const downloadResume = async params => {
  const data = await http.post('/resume/downloadResume', params, {
    responseType: 'blob',
  })
  return data
}
// resume end 👆

// candidate start 👇
export const addCandidate = async params => {
  const { data } = await http.post('/candidate/addCandidate', params)
  return data
}

export const getCandidatesByUserId = async () => {
  const { data } = await http.get('/candidate/getCandidatesByUserId')
  return data
}

export const getCandidatebyId = async params => {
  const { data } = await http.get('/candidate/getCandidatebyId', { params })
  return data
}

export const updateCandidateById = async params => {
  const { data } = await http.post('/candidate/updateCandidateById', params)
  return data
}

export const getCandidatesByPositionId = async params => {
  const { data } = await http.get('/candidate/getCandidatesByPositionId', {
    params,
  })
  return data
}

export const getCandidatesByHrgUserId = async params => {
  const { data } = await http.get('/candidate/getCandidatesByHrgUserId', {
    params,
  })
  return data
}

export const updateCandidateStatus = async params => {
  const { data } = await http.post('/candidate/updateCandidateStatus', params)
  return data
}
// candidate end 👆
