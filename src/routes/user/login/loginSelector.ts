import { AppState } from 'redux/configureStore'

export const selectLoginData = ({ user }: AppState) => ({
  loggedIn: user.loginData.loggedIn,
})

export type PropsFromSelector = ReturnType<typeof selectLoginData>
