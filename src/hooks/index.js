import { useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../api'
import { userState } from '../store'
import { userInitState } from '../store/user/user'
import { Spin } from 'antd'
import { HRG } from '../constant'

// fetch user state when initialized
export const useFetchUser = () => {
  const setUser = useSetRecoilState(userState)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const existedToken = localStorage.getItem('token')
        // Fetch user data if token exists
        if (existedToken) {
          const { data } = await getUserData()
          localStorage.setItem('token', data.refreshToken)
          setUser(_user => ({ ..._user, ...data, token: data.refreshToken }))
        }
      } catch (error) {
        console.log(error, 'USER NOT FOUND')
      }
    }
    fetchUserData()
  }, [setUser])
}

// logout logic
export const useLogOut = (isHrg = false) => {
  const navigate = useNavigate()
  const setUserState = useSetRecoilState(userState)
  const logOut = () => {
    localStorage.removeItem('token')
    setUserState(userInitState)
    navigate(`/signin${isHrg ? `?role=${HRG}` : ''}`)
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
      wrapperClassName="spinWrapper"
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

export const useIsHrg = () => {
  const user = useRecoilValue(userState)
  const isHrg = useMemo(() => user.role === HRG, [user])
  return isHrg
}
