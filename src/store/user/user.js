import { atom } from 'recoil'

const userStateKey = 'USER_ATOM'
export const userInitState = {
  username: '',
  userId: '',
  role: '',
  token: ''
}
export const userState = atom({
  key: userStateKey,
  default: userInitState,
})
