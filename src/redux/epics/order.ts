import { of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'

import { ORDER_GET, ORDER_POST } from 'constants/endpoints'
import {
  ORDER_FETCH,
  orderPayloadReset,
  orderFetchFailure,
  orderPostSuccess,
  orderPostFailure,
} from 'redux/ducks/order'
import { snackbarError } from 'redux/ducks/snackbar'

const noDataFetched = (name: string) => `No ${name} fetched`

export const orderFetchEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(ORDER_FETCH),
    mergeMap((action: any) => {
      return api({
        endpoint: ORDER_GET,
        ...action.payload,
      }).pipe(
        mergeMap(({ response }) => {
          console.log('response', response)
          throw new Error(noDataFetched('lots'))
        }),
        catchError((err) => of(orderFetchFailure(), snackbarError({
          id: '15001',
          code: err.response && err.response.code ? err.response.code  : JSON.stringify(err),
          message: err.response && err.response.message ? err.response.message  : JSON.stringify(err)
        }))),
      )
    }),
  )

export const orderPostEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(ORDER_POST),
    mergeMap((action: any) => {
      const {order: payload, closeModal} = action.payload
      const {
        orderNumber,
        orderProduct: { code },
      } = state$.value.order.payload
      payload.orderNumber = orderNumber
      payload.orderProduct.code = code
      return api({
        endpoint: ORDER_POST,
        params: {
          uri: 'product',
        },
        body: {
          value: JSON.stringify(payload)
        },
      }).pipe(
        mergeMap(({ response }) => {
          const {data, code} = response.data
          if (code === 200) {
            of(
              orderPostSuccess(data),
              orderPayloadReset(),
              closeModal()
            )
          }
          throw new Error(noDataFetched('lots'))
        }),
        catchError((err) => of(orderPostFailure(), snackbarError({
          id: '15002',
          code: err.response && err.response.code ? err.response.code  : JSON.stringify(err),
          message: err.response && err.response.message ? err.response.message  : JSON.stringify(err)
        }))),
      )
    }),
  )
