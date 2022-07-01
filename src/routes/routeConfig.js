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
const MyReferral = React.lazy(() => import('../pages/myReferral'))

const LoadingSpin = () => {
  const style = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .15)'
  }
  return (
    <div style={style}>
      <Spin size="large" tip="Loading..."></Spin>
    </div>
  )
}

export const routes = [
  {
    path: '/home',
    element: <Home></Home>,
  },
  {
    path: '/signup',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <SignUp />
      </React.Suspense>
    ),
  },
  {
    path: '/signin',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <SignIn />
      </React.Suspense>
    ),
  },
  {
    path: '/positions',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <PositionList />
      </React.Suspense>
    ),
  },
  {
    path: '/changePassword',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <ChangePsw />
      </React.Suspense>
    ),
  },
  {
    path: '/position/:positionId',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <PositionDetail />
      </React.Suspense>
    ),
  },
  {
    path: '/myUpload',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <MyUpload />
      </React.Suspense>
    ),
  },
  {
    path: '/uploadPosition',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <UploadPosition />
      </React.Suspense>
    ),
  },
  {
    path: '/recommend',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <RecommendPosition />
      </React.Suspense>
    ),
  },
  {
    path: '/myReferral',
    element: (
      <React.Suspense fallback={<LoadingSpin></LoadingSpin>}>
        <MyReferral />
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
