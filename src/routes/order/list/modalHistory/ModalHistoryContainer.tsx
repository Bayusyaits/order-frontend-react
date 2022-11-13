import React, { useState, useEffect, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { orderHistoryGet } from 'redux/ducks/order'
import { selectOrderListData } from '../orderListSelector'
import ModalHistoryView from './ModalHistoryView'

export type Props = any

const ModalHistoryContainer = (props: Props) => {
  const dispatch = useDispatch()
  const { data } = useSelector(selectOrderListData, shallowEqual)
  const handleLoad = useCallback(() => {
    const o = {
      params: null,
      query: {
        get: 'all',
        ...data.query,
      },
    }
    dispatch(orderHistoryGet(o))
  }, [dispatch])
  const handleSelected = (val: string | number) => {
    props.onFinish(val)
  }
  const handler = {
    handleLoad,
    handleSelected,
  }
  return <ModalHistoryView {...handler} {...data} />
}

export default ModalHistoryContainer
