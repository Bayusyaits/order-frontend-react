import React from 'react'
import { currencyFormat } from 'helpers/mixins'
import styles from './row.module.css'

const RowView = (props: any) => {
  const { items, handleSelected } = props
  const setRow: any = () => {
    if (items && items.length > 0) {
      return items.map((el: any, k: number) => {
        return (
          <>
            <tr id={`row-${k}`} key={`row-${k}`} className={`${styles.tr} intro-x`}>
              <td key={`row-col-3-${k}`} className='text-center'>
                <button
                  onClick={() => handleSelected(el.number)}
                  key={`row-col-btn-6-1-${k}`}
                  type='button'
                  className='flex items-center text-primary mr-3'
                >
                  {el.customerName}
                </button>
              </td>
              <td key={`row-col-4-${k}`} className='text-center'>
                {el.transactionDate}
              </td>
              <td key={`row-col-5-${k}`} className='w-40'>
                {currencyFormat(el.totalCharge)}
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
            <th className='text-center whitespace-nowrap'>NAMA CUSTOMER</th>
            <th className='text-center whitespace-nowrap'>TANGGAL TRANSAKSI</th>
            <th className='text-center whitespace-nowrap'>TOTAL</th>
          </tr>
        </thead>
        <tbody>{setRow()}</tbody>
      </table>
    </div>
  )
}

export default RowView
