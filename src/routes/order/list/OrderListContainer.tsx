import React, { useContext, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useModal, ModalPopupDispatchContext } from 'hoc/withModal'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { productFetch } from 'redux/ducks/product'
import {
  orderSubmitPost,
  orderItemAdd,
  orderItemDelete,
  orderHistoryDetailGet,
} from 'redux/ducks/order'
import { selectOrderListData } from './orderListSelector'
import ModalHistory from './modalHistory'
import OrderListView from './OrderListView'

dayjs.extend(utc)

const OrderListContainer = () => {
  const { openModal } = useModal()
  const dispatch = useDispatch()
  const { closeModal, onSubmitModal } = useContext(ModalPopupDispatchContext)
  const { payload, product } = useSelector(selectOrderListData, shallowEqual)
  let initialState = { ...payload }
  useEffect(() => {
    initialState = payload
  }, [payload])
  const schema = yup
    .object({
      customerName: yup.string().required('Nama Customer harus diisi'),
      transactionDate: yup.string().required('Transaction Date harus diisi'),
      totalQty: yup.number(),
      totalWeight: yup.number(),
      totalCharge: yup.number(),
      items: yup.array().of(
        yup.object({
          ...{
            productCode: yup.string().required('Kode Barang Harus diisi'),
            name: yup.string().required('Nama Barang Harus diisi'),
            total: yup.number().required('Harga Harus diisi'),
            totalQty: yup.number().required('Quantity Harus diisi'),
          },
        }),
      ),
    })
    .required()
  const { register, watch, setValue, setError, control, handleSubmit, formState } = useForm({
    mode: 'all',
    defaultValues: initialState,
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    const o = {
      params: null,
      query: {
        get: 'all',
        ...product.query,
      },
    }
    if (!product.items || product.items.length === 0) {
      dispatch(productFetch(o))
    }
  }, [])
  const { errors } = formState
  const handleHistory = (data: any) => {
    const onFinish = (val: any) => {
      console.log('finish', val)
      dispatch(
        orderHistoryDetailGet({
          number: val,
        }),
      )
      onSubmitModal()
    }
    openModal({
      title: 'Dialog History',
      className: {
        dialog: 'modal-md',
      },
      component: () => <ModalHistory onFinish={onFinish} />,
      onClose: () => {
        console.log('close')
        closeModal()
      },
    })
  }
  const handleSave = (e: any) => {
    e.preventDefault()
    const { target } = e
    const form = new FormData(target)
    const transactionDate = form.get('transactionDate')
    const data = Object.fromEntries(new FormData(e.target).entries())
    if (errors.transactionDate?.message && transactionDate) {
      setError('transactionDate', { type: 'focus', message: '' })
    } else if (!transactionDate) {
      setError('transactionDate', { type: 'focus', message: 'Transaction Date harus diisi' })
    }
    const obj = initialState
    const items = []
    const d = initialState.items
    let totalQty = 0
    let totalCharge = 0
    let totalWeight = 0
    console.log('datanya', data)
    if (d && d.length > 0) {
      for (let k = 0; k < d.length; k++) {
        if (data[`items[${k}].productCode`]) {
          const qty = Number(data[`items[${k}].totalQty`])
          const price = Number(data[`items[${k}].price`])
          totalQty += qty
          totalCharge += Number(qty * price)
          totalWeight += Number(d[k].weight * qty)
          items.push({
            ...d[k],
            totalQty: qty,
            name: data[`items[${k}].name`],
            totalWeight: Number(d[k].weight * qty),
            price,
            total: Number(qty * price),
          })
        }
      }
    }
    if (data[`customerName`]) {
      obj.customerName = data[`customerName`]
    }
    obj.totalCharge = totalCharge
    obj.totalWeight = totalWeight
    obj.number = Math.random().toString(4).substr(2, 9)
    obj.totalQty = totalQty
    if (transactionDate) {
      obj.transactionDate = transactionDate
    }
    obj.items = items
    dispatch(orderSubmitPost(obj))
  }
  const handleAdd = (k: number) => dispatch(orderItemAdd(k))
  const handleDelete = (k: number) => dispatch(orderItemDelete(k))
  const action = {
    handleSave,
    handleHistory,
    handleAdd,
    handleDelete,
  }
  return (
    <OrderListView
      {...action}
      {...initialState}
      product={product}
      register={register}
      control={control}
      errors={errors}
      watch={watch}
      setValue={setValue}
      handleSubmit={handleSubmit}
    />
  )
}

export default OrderListContainer
