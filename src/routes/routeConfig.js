import React from 'react'
import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import Home from '../pages/home'
import NotFound from '../components/notFound'
const SignUp = React.lazy(() => import('../pages/signUp'))
const SignIn = React.lazy(() => import('../pages/signIn'))
const PositionList = React.lazy(() => import('../pages/positionList'))
const PositionDetail = React.lazy(() => import('../pages/positionDetail'))
const ChangePsw = React.lazy(() => import('../pages/changePassword'))
const MyUpload = React.lazy(() => import('../pages/myUpload'))
const UploadPosition = React.lazy(() => import('../pages/uploadPosition'))
const RecommendPosition = React.lazy(() => import('../pages/recommendPosition'))

export const routes = [
  {
    path: '/home',
    element: <Home></Home>,
  },
  {
    path: '/signup',
    element: (
      <React.Suspense fallback={<Spin size="large" />}>
        <SignUp />
      </React.Suspense>
    ),
  },
  {
    path: '/signin',
    element: (
      <React.Suspense fallback={<Spin size="large" />}>
        <SignIn />
      </React.Suspense>
    ),
  },
  {
    path: '/positions',
    element: (
      <React.Suspense fallback={<Spin size="large" />}>
        <PositionList />
      </React.Suspense>
    ),
  },
  {
    path: '/changePassword',
    element: (
      <React.Suspense fallback={<Spin size="large" />}>
        <ChangePsw />
      </React.Suspense>
    ),
  },
  {
    path: '/position/:positionId',
    element: (
      <React.Suspense fallback={<Spin size="large" />}>
        <PositionDetail />
      </React.Suspense>
    ),
  },
  {
    path: '/myUpload',
    element: (
      <React.Suspense fallback={<Spin size="large" />}>
        <MyUpload />
      </React.Suspense>
    ),
  },
  {
    path: '/uploadPosition',
    element: (
      <React.Suspense fallback={<Spin size="large" />}>
        <UploadPosition />
      </React.Suspense>
    ),
  },
  {
    path: '/recommend',
    element: (
      <React.Suspense fallback={<Spin size="large" />}>
        <RecommendPosition />
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
