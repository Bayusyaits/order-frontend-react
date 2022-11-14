import React from 'react'
import Row from './row'
import styles from 'components/modalPopup/modal.module.css'
export const ModalHistoryView = (props: any) => {
  const { handleLoad, ...obj } = props
  return (
    <>
      <div className={`${styles.modalBody} grid grid-cols-12 gap-4 gap-y-3`}>
        <Row {...obj} />
      </div>
      <div className='modal-footer text-right'>
        <button onClick={() => handleLoad()} type='button' className='btn btn-primary w-32'>
          Load
        </button>
      </div>
    </>
  )
}

export default ModalHistoryView
