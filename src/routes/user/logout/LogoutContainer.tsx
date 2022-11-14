import React from 'react'
import { removeLoginData } from 'utils/token'
function LogoutContainer() {
  removeLoginData()
  window.location.href = '/login'
  return <div>Logout</div>
}

export default LogoutContainer
