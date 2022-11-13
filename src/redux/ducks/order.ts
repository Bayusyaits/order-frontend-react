import createReducer from '../../utils/createReducer'
export const ORDER_SUBMIT_POST = 'order/SUBMIT_POST'
export const ORDER_SUBMIT_POST_SUCCESS = 'order/SUBMIT_POST_SUCCESS'
export const ORDER_SUBMIT_POST_FAILURE = 'order/SUBMIT_POST_FAILURE'

export const ORDER_HISTORY_GET = 'order/HISTORY_GET'
export const ORDER_HISTORY_GET_SUCCESS = 'order/HISTORY_GET_SUCCESS'
export const ORDER_HISTORY_GET_FAILURE = 'order/HISTORY_GET_FAILURE'

export const ORDER_HISTORY_DETAIL_GET = 'order/HISTORY_DETAIL_GET'
export const ORDER_HISTORY_DETAIL_GET_SUCCESS = 'order/HISTORY_DETAIL_GET_SUCCESS'
export const ORDER_HISTORY_DETAIL_GET_FAILURE = 'order/HISTORY_DETAIL_GET_FAILURE'

export const ORDER_ITEM = 'order/ITEM'
export const ORDER_ITEM_SET = 'order/ITEM_SET'
export const ORDER_ITEM_ADD = 'order/ITEM_ADD'
export const ORDER_ITEM_DELETE = 'order/ITEM_DELETE'
export const ORDER_ITEM_UPDATE = 'order/ITEM_UPDATE'

export const ORDER_PAYLOAD_RESET = 'order/PAYLOAD_RESET'

export interface PayloadItemState {
  productCode: string
  name: string
  price: number
  qty: number
  weight: number
  paymentMethod: string
  totalQty: number
  total: number
  totalWeight: number
  state: string
}
export interface PayloadState {
  number: string
  customerName: string
  totalCharge: number
  totalWeight: number
  totalQty: number
  transactionDate: any
  items: PayloadItemState[]
}
export interface OrderState {
  isDataLoading: boolean
  isLoading: boolean
  data: {
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
    items: PayloadState[]
  }
  payload: PayloadState
  checkedItems: number[]
}

export const RESET_PAYLOAD_ITEM = {
  productCode: '',
  name: '',
  price: 0,
  qty: 0,
  weight: 0,
  paymentMethod: 'pas',
  totalQty: 0,
  total: 0,
  totalWeight: 0,
  state: 'done',
}

export const RESET_PAYLOAD = {
  number: '',
  customerName: '',
  totalCharge: 0,
  totalWeight: 0,
  totalQty: 0,
  transactionDate: '',
}

export const PAYLOAD = {
  ...RESET_PAYLOAD,
  items: [RESET_PAYLOAD_ITEM],
}

export const INITIAL_STATE: OrderState = {
  isDataLoading: false,
  isLoading: false,
  payload: PAYLOAD,
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
    items: [PAYLOAD],
  },
  checkedItems: [],
}
export default createReducer(INITIAL_STATE, {
  [ORDER_ITEM_ADD]: (state: OrderState, action) => {
    if (action.payload !== undefined) {
      state.payload.items.push(RESET_PAYLOAD_ITEM)
    }
  },
  [ORDER_HISTORY_GET_SUCCESS]: (state: OrderState, action) => {
    const { body, pagination } = action.payload
    state.data.items = body
    state.data.pagination = pagination
  },
  [ORDER_HISTORY_DETAIL_GET_SUCCESS]: (state: OrderState, action) => {
    if (action.payload) {
      state.payload = action.payload
    }
  },
  [ORDER_ITEM_DELETE]: (state: OrderState, action) => {
    if (action.payload !== undefined) {
      state.payload.items.splice(action.payload, 1)
    }
  },
  [ORDER_ITEM_UPDATE]: (state: any, action: any) => {
    const { item, index } = action.payload
    const { payload } = state
    if (payload.items[index] && item && item.code) {
      state.payload.items[index] = {
        ...state.payload.items[index],
        ...item,
        productCode: item.code,
      }
    }
  },
})

export function orderSubmitPost(payload: PayloadState) {
  return {
    type: ORDER_SUBMIT_POST,
    payload,
  }
}
export function orderSubmitPostSuccess(response: any) {
  return {
    type: ORDER_SUBMIT_POST_SUCCESS,
    payload: response,
  }
}
export function orderSubmitPostFailure() {
  return {
    type: ORDER_SUBMIT_POST_FAILURE,
  }
}
export function orderHistoryGet(payload: OrderState['data']['query']) {
  return {
    type: ORDER_HISTORY_GET,
    payload,
  }
}
export function orderHistoryGetSuccess(payload: any) {
  return {
    type: ORDER_HISTORY_GET_SUCCESS,
    payload,
  }
}
export function orderHistoryGetFailure() {
  return {
    type: ORDER_HISTORY_GET_FAILURE,
  }
}
export function orderHistoryDetailGet(payload: { number: string }) {
  return {
    type: ORDER_HISTORY_DETAIL_GET,
    payload,
  }
}
export function orderHistoryDetailGetSuccess(payload: any) {
  return {
    type: ORDER_HISTORY_DETAIL_GET_SUCCESS,
    payload,
  }
}
export function orderHistoryDetailGetFailure() {
  return {
    type: ORDER_HISTORY_DETAIL_GET_FAILURE,
  }
}
export function orderItemAdd(payload: number) {
  return {
    type: ORDER_ITEM_ADD,
    payload,
  }
}
export function orderItemDelete(payload: number) {
  return {
    type: ORDER_ITEM_DELETE,
    payload,
  }
}
export function orderItemUpdate(payload: { item: PayloadItemState; index: number }) {
  return {
    type: ORDER_ITEM_UPDATE,
    payload,
  }
}
export function orderPayloadReset() {
  return {
    type: ORDER_PAYLOAD_RESET,
  }
}
export function orderItemSet() {
  return {
    type: ORDER_ITEM_SET,
  }
}
