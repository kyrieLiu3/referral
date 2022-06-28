import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../api'
import { userState } from '../store'
import { userInitState } from '../store/user/user'
import { Spin } from 'antd'

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
