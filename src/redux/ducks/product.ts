import createReducer from '../../utils/createReducer'
import { createResetHandler, fetchHandler, fetchFailureHandler } from '../../utils/reducerHandlers'

export const PRODUCT_RESET = 'product/RESET'

export const PRODUCT_FETCH = 'product/FETCH'
export const PRODUCT_FETCH_SUCCESS = 'product/FETCH_SUCCESS'
export const PRODUCT_FETCH_FAILURE = 'product/FETCH_FAILURE'
export const PRODUCT_COUNT_CATEGORY_CODE_FETCH = 'product/COUNT_CATEGORY_CODE_FETCH'
export const PRODUCT_COUNT_CATEGORY_CODE_FETCH_SUCCESS = 'product/COUNT_CATEGORY_CODE_FETCH_SUCCESS'
export const PRODUCT_COUNT_CATEGORY_CODE_FETCH_FAILURE = 'product/COUNT_CATEGORY_CODE_FETCH_FAILURE'

export interface Data {
  isDataLoading: boolean
  isLoading: boolean
  params: {
    uri: string
  }
  query: {
    currentPage: number
    limit: number
    sortBy: string
  }
  items: {
    id: number
    sKUCode: string
    storage:
      | {
          file: {
            fileUrl: string
            fileSlug: string
            isParent: boolean
          } | null
          meta: any
        }[]
      | null
    variant: {
      productId: number
      sKUCode: string
      uPCCode: string
    }[]
  }[]
}
export interface CountData {
  total: number
}
;[]
export interface Query {
  currentPage: number
  limit: number
  sortBy: string
}

export interface ProductState {
  isDataLoading: boolean
  isLoading: boolean
  query: Query
  lastSort: string
  count: {
    isDataLoading: boolean
    isLoading: boolean
    query: {
      categoryCode: string | null
    }
    params: string | null
    categoryCode: CountData | null
  }
  data: Data
  checkedItems: number[]
}

const INITIAL_STATE: ProductState = {
  isDataLoading: false,
  isLoading: false,
  query: {
    currentPage: 1,
    limit: 20,
    sortBy: 'id',
  },
  lastSort: '',
  count: {
    isDataLoading: false,
    isLoading: false,
    query: {
      categoryCode: null,
    },
    params: '',
    categoryCode: null,
  },
  data: {
    isDataLoading: false,
    isLoading: false,
    query: {
      currentPage: 1,
      limit: 24,
      sortBy: 'stock',
    },
    params: {
      uri: '',
    },
    items: [],
  },
  checkedItems: [],
}

export default createReducer(INITIAL_STATE, {
  [PRODUCT_RESET]: createResetHandler(INITIAL_STATE),
  [PRODUCT_FETCH]: (state) => {
    state.data.isDataLoading = true
  },
  [PRODUCT_FETCH_SUCCESS]: (state, action) => {
    const { items } = action.payload
    state.data.isDataLoading = false
    state.data.items = items
    if (state.query.sortBy.length === 0 || !state.lastSort) {
      state.lastSort = JSON.stringify(state.query.sortBy)
    }
    if (items.length === 0) {
      state.checkedItems = []
    }
  },
  [PRODUCT_FETCH_FAILURE]: (state) => {
    state.data.isDataLoading = false
  },
  [PRODUCT_COUNT_CATEGORY_CODE_FETCH]: (state) => {
    state.count.isDataLoading = true
  },
  [PRODUCT_COUNT_CATEGORY_CODE_FETCH_SUCCESS]: (state, action) => {
    const { items } = action.payload
    state.count.isDataLoading = false
    state.count.categoryCode = items
  },
  [PRODUCT_COUNT_CATEGORY_CODE_FETCH_FAILURE]: (state) => {
    state.count.isDataLoading = false
  },
})

export function productReset() {
  return {
    type: PRODUCT_RESET,
  }
}
export function productFetch(params: any) {
  return {
    type: PRODUCT_FETCH,
    payload: params,
  }
}
export function productCheckedItemsSingleSet(id: number) {
  return {
    type: PRODUCT_FETCH,
    payload: id,
  }
}
export function productFetchSuccess(data: ProductState['data']) {
  return {
    type: PRODUCT_FETCH_SUCCESS,
    payload: data,
  }
}
export function productFetchFailure() {
  return {
    type: PRODUCT_FETCH_FAILURE,
  }
}
export function productCountCategoryCodeFetch(obj: {
  params: ProductState['count']['params'] | null
  query: ProductState['count']['query']
}) {
  return {
    type: PRODUCT_COUNT_CATEGORY_CODE_FETCH,
    payload: { ...obj },
  }
}
export function productCountCategoryCodeFetchSuccess(data: ProductState['data']) {
  return {
    type: PRODUCT_COUNT_CATEGORY_CODE_FETCH_SUCCESS,
    payload: data,
  }
}
export function productCountCategoryCodeFetchFailure() {
  return {
    type: PRODUCT_COUNT_CATEGORY_CODE_FETCH_FAILURE,
  }
}
