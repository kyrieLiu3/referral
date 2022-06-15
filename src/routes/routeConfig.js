import { Navigate } from 'react-router-dom'
import NotFound from '../components/notFound'
import Home from '../pages/home'
import SignUp from '../pages/signUp'
import SignIn from '../pages/signIn'
import JobList from '../pages/jobList'

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
    path: '/jobs',
    element: <JobList></JobList>,
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
