import { of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'

import { PRODUCT_GET } from 'constants/endpoints'
import { PRODUCT_FETCH, productFetchSuccess, productFetchFailure } from 'redux/ducks/product'
import { snackbarError } from 'redux/ducks/snackbar'

export const productFetchEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(PRODUCT_FETCH),
    mergeMap((action: any) => {
      return api({
        endpoint: PRODUCT_GET,
        ...action.payload,
      }).pipe(
        mergeMap(({ response }) => {
          const arr: any = response.data && response.data.data ? response.data.data : response.data
          if (!arr || !arr.body || arr.body.length === 0) {
            return of(snackbarError({
              id: Math.random().toString(4).substr(2, 5),
              code: 404,
              message: 'Barang tidak ditemukan',
            }))
          }
          return of(productFetchSuccess(arr))
        }),
        catchError((err) =>
          of(
            productFetchFailure(),
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
