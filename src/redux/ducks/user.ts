import { setLoginData } from 'utils/token'
import createReducer from '../../utils/createReducer'
export const USER_LOGIN = 'user/LOGIN'
export const USER_LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'user/LOGIN_FAILURE'

export const USER_REGISTRATION = 'user/REGISTRATION'
export const USER_REGISTRATION_SUCCESS = 'user/REGISTRATION_SUCCESS'
export const USER_REGISTRATION_FAILURE = 'user/REGISTRATION_FAILURE'

export const USER_USER_DATA_CHECK = 'user/USER_DATA_CHECK'
export const USER_USER_DATA_CHECK_SUCCESS = 'user/USER_DATA_CHECK_SUCCESS'
export const USER_USER_DATA_SIGN_OUT = 'user/USER_DATA_SIGN_OUT'
export interface UserState {
  login: {
    username: string | null
    password: string | null
    isLoading: boolean
  }
  registration: {
    username: string | null
    password: string | null
    isLoading: boolean
  }
  loginData: {
    token: string | null
    loggedIn: boolean
    expired: Date | number
  }
}

type Props = UserState
const payloadRegistration = {
  username: null,
  password: null,
  isLoading: false,
}
export const INITIAL_STATE: Props = {
  login: {
    username: null,
    password: null,
    isLoading: false,
  },
  registration: payloadRegistration,
  loginData: {
    token: null,
    loggedIn: false,
    expired: 0,
  }
}

const userSuccessLogin = (state: UserState, action: CustomAction) => {
  const { loginData } = action.payload
  if (loginData && loginData.loggedIn) {
    setLoginData(loginData)
    state.loginData = loginData
  }
}
const userSuccessRegistration = (state: UserState, action: CustomAction) => {
  state.registration = payloadRegistration
  userSuccessLogin(state, action)
}

export default createReducer(INITIAL_STATE, {
  [USER_USER_DATA_CHECK]: (state) => {
    state.login.isLoading = true
  },
  [USER_LOGIN_SUCCESS]: userSuccessLogin,
  [USER_REGISTRATION_SUCCESS]: userSuccessRegistration,
})

export function userLogin(payload: unknown) {
  return {
    type: USER_LOGIN,
    payload,
  }
}
export function userLoginSuccess(response: Pick<UserState, 'loginData'>) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: response,
  }
}
export function userLoginFailure() {
  return {
    type: USER_LOGIN_FAILURE,
  }
}
export function userRegistration(payload: unknown) {
  return {
    type: USER_REGISTRATION,
    payload,
  }
}
export function userRegistrationSuccess(response: Pick<UserState, 'loginData'>) {
  return {
    type: USER_REGISTRATION_SUCCESS,
    payload: response,
  }
}
export function userRegistrationFailure() {
  return {
    type: USER_REGISTRATION_FAILURE,
  }
}
