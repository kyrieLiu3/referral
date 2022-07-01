import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Forbidden from '../components/forbidden'
import { routes } from './routeConfig'
import { useFetchUser, useAuth } from '../hooks'

const WithAuth = ({ path, children }) => {
  const isAuth = useAuth()
  const pagesWithoutAuth = ['/', '/home', '/signin', '/signup']
  return isAuth || pagesWithoutAuth.includes(path) ? (
    children
  ) : (
    <Forbidden></Forbidden>
  )
}

const generateRoutes = routes => {
  const routePages = routes.map(route => {
    const routePage = (
      <Route
        path={route.path}
        element={<WithAuth path={route.path}>{route.element}</WithAuth>}
        key={route.path}
      ></Route>
    )
    return routePage
  })
  return routePages
}

const RouterWrapper = () => {
  useFetchUser()
  const routePages = generateRoutes(routes)
  return (
    <BrowserRouter>
      <Routes>{routePages}</Routes>
    </BrowserRouter>
  )
}

export default RouterWrapper
