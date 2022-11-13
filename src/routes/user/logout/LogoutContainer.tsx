import React, { useState } from 'react'

import { INITIAL_STATE, userLogin } from 'redux/ducks/user'

function LogoutContainer() {
  window.location.href = '/'
  return <div>Logout</div>
}

export default LogoutContainer
