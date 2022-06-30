import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../api'
import { userState } from '../store'
import { userInitState } from '../store/user/user'
import { Spin } from 'antd'

// fetch user state when initialized
export const useFetchUser = () => {
  const setUser = useSetRecoilState(userState)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getUserData()
        const token = localStorage.getItem('token')
        setUser(_user => ({ ..._user, ...data, token }))
      } catch (error) {
        console.log(error, 'USER NOT FOUND')
      }
    }
    fetchUserData()
  }, [setUser])
}

// logout logic
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

// determine whether current user has auth to visit some special pages or not 
export const useAuth = () => {
  const user = useRecoilValue(userState)
  return !!user.token
}

export const useLoading = isLoading => {
  const Loading = ({ isLoading }) => (
    <Spin
      wrapperClassName='spinWrapper'
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: isLoading ? 'block' : 'none',
      }}
      size="large"
      tip="loading..."
    ></Spin>
  )
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (isLoading) {
      ref.current.classList.add('loadingWrapper')
    } else {
      ref.current.classList.remove('loadingWrapper')
    }
  })
  return [ref, Loading]
}
