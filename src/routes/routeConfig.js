import { Navigate } from 'react-router-dom'
import Home from '../pages/home'

export const routes = [
  {
    path: '/home',
    element: <Home></Home>,
  },
  {
    path: '/',
    redirect: true,
    element: <Navigate to="/home" replace={true}></Navigate>,
  },
]
