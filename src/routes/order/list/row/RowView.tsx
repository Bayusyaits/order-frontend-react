import React from 'react'
import type { PropsFromSelector } from '../orderListSelector'

export type ViewProps = {
  item: PropsFromSelector['data']['items'][0]
}

const RowView = ({
  item
}: any) => {
  return <div>Row Order</div>
}

export default RowView
