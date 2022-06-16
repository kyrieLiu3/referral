import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routeConfig'

const routePages = routes.map(route => {
  const routePage = (
    <Route path={route.path} element={route.element} key={route.path}></Route>
  )
  return routePage
})

const RouterWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>{routePages}</Routes>
    </BrowserRouter>
  )
}

export default RouterWrapper
