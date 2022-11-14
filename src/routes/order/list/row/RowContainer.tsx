import React from 'react'
import RowView from './RowView'

const RowContainer = (props: any) => {
  const { product, fieldArray } = props
  const { replace, fields } = fieldArray
  const handleSelected = (payload: any) => {
    if (product.items && product.items.length > 0 && payload.item) {
      const arr = [...product.items]
      const obj = arr.filter((el: any) => el && el.code === payload.item)
      const d = [...fields]
      d[payload.index] = {
        ...d[payload.index],
        ...obj[0],
        totalQty: 1,
        productCode: obj[0].code,
      }
      replace(d)
    }
  }
  return <RowView {...props} handleSelected={handleSelected} />
}

export default React.memo(RowContainer)
