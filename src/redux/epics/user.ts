import { of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'

import { USER_LOGIN_POST, USER_REGISTRATION_POST } from 'constants/endpoints'
import {
  USER_LOGIN,
  USER_REGISTRATION,
  UserState,
  userLoginSuccess,
  userLoginFailure,
  userRegistrationSuccess,
  userRegistrationFailure,
} from 'redux/ducks/user'
import { snackbarError, snackbarOpen } from 'redux/ducks/snackbar'
export const userLoginEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(USER_LOGIN),
    mergeMap((action: { payload: UserState['login'] }) => {
      return api({
        endpoint: USER_LOGIN_POST,
        body: {
          ...action.payload,
        },
      }).pipe(
        mergeMap(({ response }) => {
          const res = response.data && response.data.data ? response.data.data : response.data
          if (res && res.token) {
            return of(
              userLoginSuccess({
                loginData: res,
              }),
              snackbarOpen({
                id: Math.random().toString(4).substr(2, 5),
                code: 200,
                message: 'success logged in',
              }),
            )
          }
        }),
        catchError((err) =>
          of(
            userLoginFailure(),
            snackbarError({
              id: Math.random().toString(4).substr(2, 5),
              code: err.response && err.response.code ? err.response.code : JSON.stringify(err),
              message:
                err.response && err.response.message ? err.response.message : JSON.stringify(err),
            }),
          ),
        ),
      )
    }),
  )

export const userRegistrationEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(USER_REGISTRATION),
    mergeMap((action: { payload: UserState['login'] }) => {
      return api({
        endpoint: USER_REGISTRATION_POST,
        body: {
          ...action.payload,
        },
      }).pipe(
        mergeMap(({ response }) => {
          const res = response.data && response.data.data ? response.data.data : response.data
          if (res && res.token) {
            return of(
              userRegistrationSuccess({
                loginData: res,
              }),
              snackbarOpen({
                id: Math.random().toString(4).substr(2, 5),
                code: 200,
                message: 'success registration',
              }),
            )
          }
        }),
        catchError((err) =>
          of(
            userRegistrationFailure(),
            snackbarError({
              id: Math.random().toString(4).substr(2, 5),
              code: err.response && err.response.code ? err.response.code : JSON.stringify(err),
              message:
                err.response && err.response.message ? err.response.message : JSON.stringify(err),
            }),
          ),
        ),
      )
    }),
  )
