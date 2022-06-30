import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routeConfig'
import { useFetchUser, useAuth } from '../hooks'
const pagesWithoutAuth = ['/', '/home', '/signin', '/signup']

const generateRoutes = isAuth => {
  const routePages = routes.map(route => {
    const routePage = (
      <Route
        path={route.path}
        element={
          isAuth || pagesWithoutAuth.includes(route.path) ? (
            route.element
          ) : (
            <Navigate to="/home" replace={true}></Navigate>
          )
        }
        key={route.path}
      ></Route>
    )
    return routePage
  })
  return routePages
}

const RouterWrapper = () => {
  useFetchUser()
  const isAuth = useAuth()
  const routePages = generateRoutes(isAuth)
  return (
    <BrowserRouter>
      <Routes>{routePages}</Routes>
    </BrowserRouter>
  )
}

export default RouterWrapper
