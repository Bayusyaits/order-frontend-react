import type { AppState } from 'redux/configureStore'

export const selectOrderListData = ({ order, product }: AppState) => ({
  ...order,
  product: product.data,
})

export type PropsFromSelector = ReturnType<typeof selectOrderListData>
