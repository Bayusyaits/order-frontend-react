import { AppState } from 'redux/configureStore'

export const selectRegistrationData = ({ user }: AppState) => ({
  loggedIn: user.loginData.loggedIn
})

export type PropsFromSelector = ReturnType<typeof selectRegistrationData>
