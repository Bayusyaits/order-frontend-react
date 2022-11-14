import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import id from 'date-fns/locale/id'
registerLocale('id', id)
import 'react-datepicker/dist/react-datepicker.css'

import styles from './orderList.module.css'
import Row from './row'

const OrderListView = (props: any) => {
  const {
    fieldArray,
    handleAdd,
    handleDelete,
    handleHistory,
    handleSubmit,
    handleSave,
    control,
    watch,
    product,
    register,
    errors,
    customerName,
    transactionDate,
  } = props
  const [startDate, setStartDate] = useState(transactionDate || new Date())
  const [name, setName] = useState(customerName)
  return (
    <>
      <form onSubmit={(e) => handleSubmit(handleSave(e))} className='content'>
        <div className='intro-y flex flex-col sm:flex-row items-center mt-8'>
          <h2 className='text-lg font-medium mr-auto'>Order</h2>
          <div className='w-full sm:w-auto flex mt-4 sm:mt-0'>
            <button
              onClick={handleHistory}
              type='button'
              className='btn box text-gray-700 dark:text-gray-300 flex items-center'
            >
              {' '}
              History{' '}
            </button>
          </div>
        </div>
        <div className='intro-y box px-5 pt-5 mt-5 w-full'>
          <div className='flex flex-col lg:flex-row lg:flex-row pb-5 -mx-5'>
            <div className='px-5 tns-item w-full' id='new-products-item4' aria-hidden='true'>
              <div className='flex flex-col lg:flex-row items-center pb-5'>
                <div
                  className={`${styles.wrapper} flex flex-col sm:flex-row items-center lg:border-r border-gray-200 dark:border-dark-5`}
                >
                  <div
                    className={`mr-2 mt-2 input-form ${
                      errors.customerName?.message ? 'has-error' : ''
                    }`}
                  >
                    <label className='form-label'>Nama Customer</label>
                    <input
                      id='customerName'
                      {...register('customerName')}
                      name='customerName'
                      defaultValue={props.customerName}
                      type='text'
                      className='form-control'
                      placeholder='Nama Customer'
                    />
                    {errors.customerName?.message}
                  </div>
                  <div
                    className={`mr-2 mt-2 input-form ${
                      errors.transactionDate?.message ? 'has-error' : ''
                    }`}
                  >
                    <label className='form-label'>Tanggal Transaksi</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                      name='transactionDate'
                      id='transactionDate'
                      dateFormat='yyyy-MM-dd HH:mm:ss'
                      locale='id'
                      className='form-control'
                    />
                    {errors.transactionDate?.message}
                  </div>
                  <div className='mt-2 input-form'>
                    <label className='form-label'>Total Header</label>
                    <input
                      {...register('totalCharge')}
                      id='totalCharge'
                      name='totalCharge'
                      disabled
                      readOnly
                      type='text'
                      className='form-control'
                      placeholder='Total Header'
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row items-center border-t border-gray-200 dark:border-dark-5 pt-5'>
                <div className='flex sm:ml-auto mt-5 sm:mt-0'>
                  <button type='submit' className='btn btn-primary w-20 ml-2'>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='intro-y box px-5 pt-5 mt-5 w-full'>
          <Row
            register={register}
            watch={watch('items')}
            errors={errors}
            control={control}
            fieldArray={fieldArray}
            product={product}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
        </div>
      </form>
    </>
  )
}

export default OrderListView
