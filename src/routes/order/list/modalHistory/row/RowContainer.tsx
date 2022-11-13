import React from 'react'

import RowView from './RowView'

const RowContainer = (props: any) => {
  const { items } = props
  const handleSelected = (payload: any) => {
    props.handleSelected(payload)
  }
  return <RowView items={items} handleSelected={handleSelected} />
}

export default React.memo(RowContainer)
