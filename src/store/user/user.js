import { atom, selector } from 'recoil'

const userStateKey = 'USER_ATOM'
const userInitState = {
  username: '',
  userId: '',
  role: ''
}
export const userState = atom({
  key: userStateKey,
  default: userInitState,
})

const userSelectorKey = 'USER_SELECTOR'
export const userSelector = selector({
  key: userSelectorKey,
  get: ({ get }) => {
    const user = get(userState)
    return user.username
  },
})
