import createReducer from '../../utils/createReducer'

export const PRODUCT_FETCH = 'product/FETCH'
export const PRODUCT_FETCH_SUCCESS = 'product/FETCH_SUCCESS'
export const PRODUCT_FETCH_FAILURE = 'product/FETCH_FAILURE'
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
  pagination: {
    currentPage: number
    limit: number
    total: number
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
      sortBy: 'id',
    },
    params: {
      uri: '',
    },
    pagination: {
      currentPage: 0,
      limit: 24,
      total: 1,
    },
    items: [],
  },
  checkedItems: [],
}

export default createReducer(INITIAL_STATE, {
  [PRODUCT_FETCH]: (state) => {
    state.data.isDataLoading = true
  },
  [PRODUCT_FETCH_SUCCESS]: (state, action) => {
    const { body } = action.payload
    state.data.isDataLoading = false
    state.data.items = body
    if (state.query.sortBy.length === 0 || !state.lastSort) {
      state.lastSort = JSON.stringify(state.query.sortBy)
    }
    if (body.length === 0) {
      state.checkedItems = []
    }
  },
  [PRODUCT_FETCH_FAILURE]: (state) => {
    state.data.isDataLoading = false
  },
})
export function productFetch(params: any) {
  return {
    type: PRODUCT_FETCH,
    payload: params,
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
