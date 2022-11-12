import { of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, map, mergeMap } from 'rxjs/operators'
// import { push, replace } from 'connected-react-router'

import { PRODUCT_GET } from 'constants/endpoints'
import {
  PRODUCT_FETCH,
  productFetchSuccess,
  productFetchFailure,
  PRODUCT_COUNT_CATEGORY_CODE_FETCH,
  productCountCategoryCodeFetchSuccess,
  productCountCategoryCodeFetchFailure,
} from 'redux/ducks/product'
import { snackbarError } from 'redux/ducks/snackbar'

const noDataFetched = (name: string) => `No ${name} fetched`

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
          const obj: any = arr && arr.fields ? arr.fields : arr
          return of(productFetchSuccess(obj))
        }),
        catchError((err) => of(productFetchFailure(), snackbarError({
          id: '16001',
          code: err.response && err.response.code ? err.response.code  : JSON.stringify(err),
          message: err.response && err.response.message ? err.response.message  : JSON.stringify(err)
        }))),
      )
    }),
  )

export const productCountCategoryCodeFetchEpic: CustomEpic = (action$: any, state$: any, { api }) =>
  action$.pipe(
    ofType(PRODUCT_COUNT_CATEGORY_CODE_FETCH),
    mergeMap((action: any) => {
      return api({
        endpoint: PRODUCT_GET,
        ...action.payload,
      }).pipe(
        mergeMap(({ response }) => {
          const arr: any = response.data && response.data.data ? response.data.data : response.data
          const obj: any = {
            items: arr && arr.fields ? arr.fields : arr,
          }
          return of(productCountCategoryCodeFetchSuccess(obj))
        }),
        catchError((err) => of(productCountCategoryCodeFetchFailure(), snackbarError({
          id: '16002',
          code: err.response && err.response.code ? err.response.code  : JSON.stringify(err),
          message: err.response && err.response.message ? err.response.message  : JSON.stringify(err)
        }))),
      )
    }),
  )
