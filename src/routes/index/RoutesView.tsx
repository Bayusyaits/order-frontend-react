import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'

import { getLoginData, checkLoginData } from 'utils/token'
import { removeItem } from 'utils/localStorage'
import UserRegistration from 'routes/user/registration'
import UserLogin from 'routes/user/login'
import UserLogout from 'routes/user/logout'
import LoadingOverlay from 'components/loadingOverlay'
import NotFound from 'routes/notFound'
import { selectRoutesData } from './routesSelector'
const OrderList = lazy(() => import('routes/order/list'))

const PrivateRoute = ({ element }: any) => {
  const loginData = getLoginData()
  const checkLogin = checkLoginData(loginData)
  if (checkLogin < 1) {
    removeItem('loginData')
    return <UserLogin />
  }
  return element
}


const AuthRoute = ({ element }: any) => {
  const loginData = getLoginData()
  if (loginData && loginData.loggedIn) {
    return <Navigate to="/" replace />
  }
  return element
}

function RoutesView() {
  const { login } = useSelector(selectRoutesData, shallowEqual)

  if (login.isLoading) {
    return <LoadingOverlay />
  }

  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<PrivateRoute element={<OrderList />}></PrivateRoute>} />
        <Route path='/logout' element={<UserLogout />} />
        <Route path='/registration' element={<AuthRoute element={<UserRegistration />}></AuthRoute>} />
        <Route path='/login' element={<AuthRoute element={<UserLogin />}></AuthRoute>} />
        <Route path='/order' element={<PrivateRoute element={<OrderList />}></PrivateRoute>} />
        {/* Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default RoutesView
