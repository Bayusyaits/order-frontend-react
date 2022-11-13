import { of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'

import { ORDER_GET, ORDER_POST } from 'constants/endpoints'
import {
  ORDER_HISTORY_GET,
  ORDER_HISTORY_DETAIL_GET,
  ORDER_SUBMIT_POST,
  orderHistoryDetailGetSuccess,
  orderHistoryDetailGetFailure,
  orderHistoryGetSuccess,
  orderHistoryGetFailure,
  orderSubmitPostSuccess,
  orderSubmitPostFailure,
} from 'redux/ducks/order'
import { snackbarError, snackbarOpen } from 'redux/ducks/snackbar'

export const orderHistoryGetEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(ORDER_HISTORY_GET),
    mergeMap((action: any) => {
      return api({
        endpoint: ORDER_GET,
        ...action.payload,
      }).pipe(
        mergeMap(({ response }) => {
          const arr: any = response.data && response.data.data ? response.data.data : response.data
          return of(
            snackbarOpen({
              id: Math.random().toString(4).substr(2, 5),
              code: 200,
              message: 'data customer berhasil di load',
            }),
            orderHistoryGetSuccess(arr),
          )
        }),
        catchError((err) =>
          of(
            orderHistoryGetFailure(),
            snackbarError({
              id: '15004',
              code: err.response && err.response.code ? err.response.code : JSON.stringify(err),
              message:
                err.response && err.response.message ? err.response.message : JSON.stringify(err),
            }),
          ),
        ),
      )
    }),
  )

export const orderHistoryDetailGetEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(ORDER_HISTORY_DETAIL_GET),
    mergeMap((action: any) => {
      return api({
        endpoint: ORDER_GET,
        ...action.payload,
      }).pipe(
        mergeMap(({ response }) => {
          const arr: any = response.data && response.data.data ? response.data.data : response.data
          return of(orderHistoryDetailGetSuccess(arr))
        }),
        catchError((err) =>
          of(
            orderHistoryDetailGetFailure(),
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

export const orderSubmitPostEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(ORDER_SUBMIT_POST),
    mergeMap((action: any) => {
      const payload = action.payload
      return api({
        endpoint: ORDER_POST,
        body: {
          value: JSON.stringify(payload),
        },
      }).pipe(
        mergeMap(({ response }) => {
          const { data, code } = response
          if (code === 200) {
            return of(
              orderSubmitPostSuccess(data),
              snackbarOpen({
                id: Math.random().toString(4).substr(2, 5),
                code: 200,
                message: 'order berhasil ditambahkan',
              }),
            )
          }
        }),
        catchError((err) =>
          of(
            orderSubmitPostFailure(),
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
