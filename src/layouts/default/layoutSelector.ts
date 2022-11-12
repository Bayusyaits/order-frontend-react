import { AppState } from 'redux/configureStore'

export const selectLayoutData = ({ user, snackbar, iframe, loadingPage }: AppState) => ({
  loggedIn: user.loginData.loggedIn,
  snackbar,
  isInIframe: iframe.isInIframe,
  isLoading: loadingPage.isTriggered
})

export type PropsFromSelector = ReturnType<typeof selectLayoutData>
