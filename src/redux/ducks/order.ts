import createReducer from '../../utils/createReducer'
import { fetchHandler, fetchFailureHandler } from '../../utils/reducerHandlers'

export const ORDER_RESET = 'order/RESET'

export const ORDER_FETCH = 'order/FETCH'
export const ORDER_FETCH_SUCCESS = 'order/FETCH_SUCCESS'
export const ORDER_FETCH_FAILURE = 'order/FETCH_FAILURE'

export const ORDER_POST = 'order/POST'
export const ORDER_POST_SUCCESS = 'order/POST_SUCCESS'
export const ORDER_POST_FAILURE = 'order/POST_FAILURE'

export const ORDER_PRODUCT = 'order/PRODUCT'
export const ORDER_PRODUCT_ITEM = 'order/PRODUCT_ITEM'

export const ORDER_PAYLOAD_RESET = 'order/PAYLOAD_RESET'
export interface PayloadUserContactState {
  firstName: string
  lastName: string
  email: string
  mobilePrefix: string
  phoneNumber: string
  address: string
  countryISO: string
  type: string
  provinceName: string
  provinceCode: string
  regencyName: string
  regencyCode: string
  districtName: string
  districtCode: string
  villageName: string
  villageCode: string
  postCode: string
  remarks: string
  status: 'publish'
  salutation: string
}

export interface PayloadProductItemProps {
  productId: number
  meta?: {
    title: string | null
  }
  note: string
  quantity: number
  price: number
  unit: string
  weight: number
  totalWeight: number
  totalPrice: number
  insurance: number
  insuranceActual: number
}
export interface PayloadState {
  customerName: string
  customerPickupDate: string | Date
  customerQueue: number | string
  customerTableNumber: number
  customerType: string
  orderNumber: string
  orderProduct: {
    paymentMethod: string
    type: string
    code: string
    totalWeight: number
    totalCharge: number
    state: string
    status: string
    discount: number,
    item: PayloadProductItemProps[]
  }
  userContact?: {
    origin: PayloadUserContactState | number
    destination: PayloadUserContactState | number
  } | null
  userPayment: {
      discount: number,
      totalPaid: number,
      tax: number,
      serviceCharge: number,
      subTotal: number
      shippingPrice: number
  }
}
export interface OrderState {
  isDataLoading: boolean
  isLoading: boolean
  query: {
    currentPage: number
    limit: number
    sortBy: string
  }
  lastSort: string
  payload: PayloadState
  data: {
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
            meta: {
              title: string
            }
          }[]
        | null
      variant: {
        orderId: number
        sKUCode: string
        uPCCode: string
      }[]
    }[]
  }
  checkedItems: number[]
}

export const RESET_PAYLOAD_PRODUCT_ITEM = {
  productId: 0,
  note: '',
  quantity: 0,
  price: 0,
  unit: 'g',
  weight: 0,
  totalPrice: 0,
  totalWeight: 0,
  insurance: 0,
  insuranceActual: 0,
}

export const RESET_PAYLOAD = {
  orderNumber: '',
  customerName: '',
  customerQueue: 1,
  customerPickupDate: '',
  customerType: '',
  customerTableNumber: 0,
  orderProduct: {
    paymentMethod: '',
    type: '',
    code: '',
    discount: 0,
    totalWeight: 0,
    totalCharge: 0,
    state: 'waiting',
    status: 'publish',
    item: [],
  },
  userContact: {
    origin: 0,
    destination: 0,
  },
  userPayment: {
    discount: 0,
    totalPaid: 0,
    tax: 11,
    serviceCharge: 1000,
    subTotal: 0,
    shippingPrice: 0
  }
}

export const INITIAL_STATE: OrderState = {
  isDataLoading: false,
  isLoading: false,
  query: {
    currentPage: 1,
    limit: 20,
    sortBy: 'id',
  },
  lastSort: '',
  payload: RESET_PAYLOAD,
  data: {
    query: {
      currentPage: 1,
      limit: 5,
      sortBy: 'id',
    },
    params: {
      uri: '',
    },
    items: [],
  },
  checkedItems: [],
}
export default createReducer(INITIAL_STATE, {
  [ORDER_FETCH]: fetchHandler,
  [ORDER_FETCH_SUCCESS]: (state, action) => {
    const { items } = action.payload
    state.isDataLoading = false
    state.data.items = items
    if (state.query.sortBy.length === 0 || !state.lastSort) {
      state.lastSort = JSON.stringify(state.query.sortBy)
    }
    if (items.length === 0) {
      state.checkedItems = []
    }
  },
  [ORDER_FETCH_FAILURE]: fetchFailureHandler,
  [ORDER_PAYLOAD_RESET]: (state: any) => {
    state.payload = RESET_PAYLOAD
  },
  [ORDER_PRODUCT_ITEM]: (state: OrderState, action) => {
    const { payload } = action
    const { item } = state.payload.orderProduct
    const arr: OrderState['payload']['orderProduct']['item'] = item
    const index = item.findIndex(
      (v: PayloadProductItemProps) => payload.productId && v.productId === payload.productId,
    )
    if (index !== -1 && payload.quantity > 0) {
      arr[index] = payload
    } else if (index !== -1 && payload.quantity === 0) {
      arr.splice(index, 1)
    } else if (payload && payload.quantity > 0) {
      arr.unshift(payload)
    }
    state.payload.orderProduct.item = arr
  },
})

export function orderReset() {
  return {
    type: ORDER_RESET,
  }
}
export function orderPayloadReset() {
  return {
    type: ORDER_PAYLOAD_RESET,
  }
}
export function orderFetch(params: any) {
  return {
    type: ORDER_FETCH,
    payload: params,
  }
}
export function orderFetchSuccess(payload: OrderState['data']) {
  return {
    type: ORDER_FETCH_SUCCESS,
    payload,
  }
}
export function orderFetchFailure() {
  return {
    type: ORDER_FETCH_FAILURE,
  }
}
export function orderPost(payload: any) {
  return {
    type: ORDER_POST,
    payload,
  }
}
export function orderPostSuccess(payload: any) {
  return {
    type: ORDER_POST_SUCCESS,
    payload,
  }
}
export function orderPostFailure() {
  return {
    type: ORDER_POST_FAILURE
  }
}
export function orderCheckedItemsSingleSet(id: number) {
  return {
    type: ORDER_FETCH,
    payload: id,
  }
}
export function orderSetProductItem(payload: PayloadProductItemProps) {
  return {
    type: ORDER_PRODUCT_ITEM,
    payload,
  }
}
