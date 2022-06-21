import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../api'
import { userState } from '../store'
import { userInitState } from '../store/user/user'

// fetch user state when initialized
export const useFetchUser = () => {
  const setUserState = useSetRecoilState(userState)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getUserData()
        setUserState(userState => ({ ...userState, ...data }))
      } catch (error) {
        console.log(error, 'USER NOT FOUND')
      }
    }
    fetchUserData()
  }, [setUserState])
}

export const useLogOut = () => {
  const navigate = useNavigate()
  const setUserState = useSetRecoilState(userState)
  const logOut = () => {
    localStorage.removeItem('token')
    setUserState(userInitState)
    navigate('/signin')
  }
  return logOut
}
