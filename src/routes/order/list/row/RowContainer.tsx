import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { orderItemUpdate } from 'redux/ducks/order'
import { selectOrderListData } from '../orderListSelector'

import RowView from './RowView'

const RowContainer = (props: any) => {
  const { product } = props
  const {
    payload: { items },
  } = useSelector(selectOrderListData, shallowEqual)
  const dispatch = useDispatch()
  const handleSelected = (payload: any) => {
    if (product.items && product.items.length > 0 && payload.item) {
      const arr = [...product.items]
      const obj = arr.filter((el: any) => el && el.code === payload.item)
      dispatch(
        orderItemUpdate({
          item: obj[0],
          index: payload.index,
        }),
      )
    }
  }
  return <RowView {...props} items={items} handleSelected={handleSelected} />
}

export default React.memo(RowContainer)
