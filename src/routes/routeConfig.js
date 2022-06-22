import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from '../pages/home'
import NotFound from '../components/notFound'
const SignUp = React.lazy(() => import('../pages/signUp'))
const SignIn = React.lazy(() => import('../pages/signIn'))
const PositionList = React.lazy(() => import('../pages/positionList'))
const PositionDetail = React.lazy(() => import('../pages/positionDetail'))
const ChangePsw = React.lazy(() => import('../pages/changePassword'))
const MyUpload = React.lazy(() => import('../pages/myUpload'))
const UploadPosition = React.lazy(() => import('../pages/uploadPosition'))

export const routes = [
  {
    path: '/home',
    element: <Home></Home>,
  },
  {
    path: '/signup',
    element: (
      <React.Suspense fallback={<NotFound />}>
        <SignUp />
      </React.Suspense>
    ),
  },
  {
    path: '/signin',
    element: (
      <React.Suspense fallback={<NotFound />}>
        <SignIn />
      </React.Suspense>
    ),
  },
  {
    path: '/positions',
    element: (
      <React.Suspense fallback={<NotFound />}>
        <PositionList />
      </React.Suspense>
    ),
  },
  {
    path: '/changePassword',
    element: (
      <React.Suspense fallback={<NotFound />}>
        <ChangePsw />
      </React.Suspense>
    ),
  },
  {
    path: '/position/:id',
    element: (
      <React.Suspense fallback={<NotFound />}>
        <PositionDetail />
      </React.Suspense>
    ),
  },
  {
    path: '/myPost',
    element: (
      <React.Suspense fallback={<NotFound />}>
        <MyUpload />
      </React.Suspense>
    ),
  },
  {
    path: '/uploadPosition',
    element: (
      <React.Suspense fallback={<NotFound />}>
        <UploadPosition />
      </React.Suspense>
    ),
  },
  {
    path: '/',
    redirect: true,
    element: <Navigate to="/home" replace={true}></Navigate>,
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]
