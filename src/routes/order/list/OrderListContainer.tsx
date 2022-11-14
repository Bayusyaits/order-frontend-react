import React, { useContext, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useModal, ModalPopupDispatchContext } from 'hoc/withModal'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { productFetch } from 'redux/ducks/product'
import {
  orderSubmitPost,
  orderHistoryDetailGet,
  RESET_PAYLOAD_ITEM
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
  const defaultValues = { ...payload }
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
    defaultValues,
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    const { totalCharge, totalQty, totalWeight, items, number, customerName, transactionDate } =
      payload
    setValue('customerName', customerName)
    setValue('transactionDate', transactionDate)
    setValue('number', number)
    setValue('totalWeight', totalWeight)
    setValue('totalQty', totalQty)
    setValue('totalCharge', totalCharge)
    setValue('items', items)
  }, [payload])
  const watchAllFields = watch()
  const fieldArray = useFieldArray({
    control,
    name: 'items',
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

  const validateItems = () => {
    const p = { ...watchAllFields }
    const { items } = p
    let bool = false
    if (items && items.length > 0) {
      for (let k = 0; k < items.length; k++) {
        const { productCode, name, price, totalQty } = items[k]
        if (!productCode) {
          bool = true
          setError(`items.${k}.productCode`, { type: 'focus', message: 'Kode Barang harus diisi' })
        } else {
          setError(`items.${k}.productCode`, { type: 'focus', message: '' })
        }
        if (!price) {
          bool = true
          setError(`items.${k}.price`, { type: 'focus', message: 'Harga harus diisi' })
        } else {
          setError(`items.${k}.price`, { type: 'focus', message: '' })
        }
        if (!totalQty) {
          bool = true
          setError(`items.${k}.totalQty`, { type: 'focus', message: 'Quantity barang harus diisi' })
        } else {
          setError(`items.${k}.totalQty`, { type: 'focus', message: '' })
        }
        if (!name) {
          bool = true
          setError(`items.${k}.name`, { type: 'focus', message: 'Nama barang harus diisi' })
        } else {
          setError(`items.${k}.name`, { type: 'focus', message: '' })
        }
      }
    }
    return bool
  }
  const handleHistory = (data: any) => {
    const onFinish = (val: any) => {
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
        closeModal()
      },
    })
  }
  const handleSave = (e: any) => {
    e.preventDefault()
    const { target } = e
    const formData = new FormData(target)
    const data = Object.fromEntries(formData.entries())
    const p = { ...watchAllFields }
    const { number, items } = p
    let totalQty = 0
    let totalCharge = 0
    let totalWeight = 0
    let bool = validateItems()
    if (errors.transactionDate?.message && data['transactionDate']) {
      setError('transactionDate', { type: 'focus', message: '' })
    } else if (!data['transactionDate']) {
      bool = true
      setError('transactionDate', { type: 'focus', message: 'Transaction Date harus diisi' })
    }
    if (errors.transactionDate?.message && data['customerName']) {
      setError('customerName', { type: 'focus', message: '' })
    } else if (!data['customerName']) {
      bool = true
      setError('customerName', { type: 'focus', message: 'Nama Customer harus diisi' })
    }
    if (!bool) {
      for (let k = 0; k < items.length; k++) {
        const { totalQty: qty } = items[k]
        let total = 0
        const idTotal = document.getElementById(`items.${k}.total`)
        if (idTotal) {
          total = +idTotal.value
        }
        const weight = +items[k].weight
        totalQty += +qty
        totalCharge += +total
        totalWeight += Number(weight * qty)
      }
      p.totalCharge = totalCharge
      p.totalWeight = totalWeight
      if (!number || number === '') {
        p.number = `1${Math.random().toString(4).substr(2, 7)}`
      }
      p.totalQty = totalQty
      setValue('totalCharge', totalCharge)
      p.transactionDate = data['transactionDate']
      dispatch(orderSubmitPost(p))
    }
  }
  const handleAdd = (k: number) => {
    const bool = validateItems()
    if (!bool) {
      fieldArray.append(RESET_PAYLOAD_ITEM)
    }
  }
  const handleDelete = (k: number) => fieldArray.remove(k)
  const action = {
    handleSave,
    handleHistory,
    handleAdd,
    handleDelete,
  }
  return (
    <OrderListView
      {...action}
      {...defaultValues}
      product={product}
      register={register}
      control={control}
      errors={errors}
      watch={watch}
      fieldArray={fieldArray}
      setValue={setValue}
      handleSubmit={handleSubmit}
    />
  )
}

export default OrderListContainer
