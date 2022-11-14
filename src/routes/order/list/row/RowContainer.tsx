import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { selectOrderListData } from '../orderListSelector'

import RowView from './RowView'

const RowContainer = (props: any) => {
  const { product, fieldArray } = props
  const {
    payload: { items },
  } = useSelector(selectOrderListData, shallowEqual)
  const { replace } = fieldArray
  const handleSelected = (payload: any) => {
    if (product.items && product.items.length > 0 && payload.item) {
      const arr = [...product.items]
      const obj = arr.filter((el: any) => el && el.code === payload.item)
      const d = [...items]
      d[payload.index] = {
        ...d[payload.index],
        ...obj[0],
        productCode: obj[0].code,
      }
      replace(d)
    }
  }
  return <RowView {...props} items={items} handleSelected={handleSelected} />
}

export default React.memo(RowContainer)
