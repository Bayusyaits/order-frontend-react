import { AppState } from 'redux/configureStore'

export const snackbarData = ({ snackbar }: AppState) => ({
  alerts: snackbar.alerts,
})

export type PropsFromSelector = ReturnType<typeof snackbarData>
