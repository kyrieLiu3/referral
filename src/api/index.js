import http from './http'

export const httpSignup = async (params) => {
  const { data } = await http.post('/user/signup', params)
  return data
}