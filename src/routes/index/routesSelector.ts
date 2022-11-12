import { AppState } from 'redux/configureStore'

export const selectRoutesData = ({ user, store }: AppState) => ({
  login: user.login,
  loginData: user.loginData,
})
