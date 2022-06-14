import { Navigate } from 'react-router-dom'
import NotFound from '../components/notFound'
import Home from '../pages/home'
import SignUp from '../pages/signUp'
import SignIn from '../pages/signIn'

export const routes = [
  {
    path: '/home',
    element: <Home></Home>,
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>,
  },
  {
    path: '/signin',
    element: <SignIn></SignIn>,
  },
  {
    path: '/',
    redirect: true,
    element: <Navigate to="/home" replace={true}></Navigate>,
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]
