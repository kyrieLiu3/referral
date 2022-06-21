import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { getUserData } from '../api'
import { userState } from '../store'

// fetch user state when initialized
export const useFetchUser = () => {
  const setUserState = useSetRecoilState(userState)
  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await getUserData()
      setUserState(userState => ({ ...userState, ...data }))
    }
    fetchUserData()
  }, [setUserState])
}