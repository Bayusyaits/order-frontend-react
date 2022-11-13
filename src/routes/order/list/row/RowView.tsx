import React, { useState } from 'react'
import { PlusCircle, Trash } from 'react-feather'
import SelectSearch from 'components/form/select-search'
import { initialState } from 'components/form/select-search/SelectSearchContext'
import styles from './row.module.css'
import type { PropsFromSelector } from '../orderListSelector'

export type ViewProps = {
  item: PropsFromSelector['payload']['items'][0]
}

const RowView = (props: any) => {
  const { register, watch, product, items, handleSelected, handleAdd, handleDelete } = props
  const setRow: any = () => {
    if (items && items.length > 0) {
      return items.map((el: any, k: number) => {
        const select = initialState
        select.id = `row-col-select-search-1-${k}`
        select.showCode = true
        select.value = el.productCode
        select.setValue = (val: any) => {
          handleSelected({
            item: val,
            index: k,
          })
        }
        select.isFix = false
        select.data = product.items ? product.items : []
        return (
          <>
            <tr id={`row-${k}`} key={`row-${k}`} className={`${styles.tr} intro-x`}>
              <td key={`row-col-1-${k}`}>
                <div
                  key={`row-col-select-1-${k}`}
                  className='text-gray-600 text-xs whitespace-nowrap mt-0.5'
                >
                  <SelectSearch {...select} />
                  <input
                    name={`items[${k}].productCode`}
                    value={el.productCode}
                    key={`row-col-input-1-${k}`}
                    type='hidden'
                    className='form-control'
                  />
                </div>
              </td>
              <td key={`row-col-2-${k}`} className='text-center'>
                <input
                  {...register(`items[${k}].name`)}
                  name={`items[${k}].name`}
                  value={el.name}
                  defaultValue={el.name}
                  key={`row-col-input-2-${k}`}
                  type='text'
                  className='form-control'
                  placeholder='Nama Barang'
                />
              </td>
              <td key={`row-col-3-${k}`} className='text-center'>
                <input
                  name={`items[${k}].totalQty`}
                  key={`row-col-input-3-${k}`}
                  defaultValue={el.totalQty}
                  type='text'
                  className='form-control'
                  placeholder='Quantity'
                />
              </td>
              <td key={`row-col-4-${k}`} className='text-center'>
                <input
                  name={`items[${k}].price`}
                  value={el.price}
                  defaultValue={el.price}
                  key={`row-col-input-4-${k}`}
                  type='text'
                  className='form-control'
                  placeholder='Harga'
                />
              </td>
              <td key={`row-col-5-${k}`} className='w-40'>
                <input
                  name={`items[${k}].total`}
                  value={el.total}
                  defaultValue={el.total}
                  key={`row-col-input-5-${k}`}
                  disabled
                  readOnly
                  type='text'
                  className='form-control'
                  placeholder='Total'
                />
              </td>
              <td key={`row-col-6-${k}`} className='table-report__action w-56'>
                <div className='flex justify-center items-center'>
                  <button
                    onClick={() => handleAdd(k)}
                    key={`row-col-btn-6-1-${k}`}
                    type='button'
                    className='flex items-center mr-3'
                  >
                    {' '}
                    <PlusCircle width={16} /> <span className='ml-1'>Add</span>{' '}
                  </button>
                  {k !== 0 && items.length > 0 && (
                    <button
                      onClick={() => handleDelete(k)}
                      key={`row-col-btn-6-2-${k}`}
                      type='button'
                      className='flex items-center text-theme-24'
                    >
                      <Trash width={16} /> <span className='ml-1'>Delete</span>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          </>
        )
      })
    }
  }
  return (
    <div className={`intro-y col-span-12 overflow-auto lg:overflow-visible`}>
      <table className='table table-report -mt-2'>
        <thead>
          <tr>
            <th className='whitespace-nowrap'>KODE BARANG</th>
            <th className='text-center whitespace-nowrap'>NAMA BARANG</th>
            <th className='text-center whitespace-nowrap'>QUANTITY</th>
            <th className='text-center whitespace-nowrap'>HARGA</th>
            <th className='text-center whitespace-nowrap'>TOTAL</th>
            <th className='text-center whitespace-nowrap'>ACTION</th>
          </tr>
        </thead>
        <tbody>{setRow()}</tbody>
      </table>
    </div>
  )
}

export default RowView
