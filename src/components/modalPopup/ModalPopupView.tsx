import React, { memo, useContext } from 'react'
import { ModalPopupStateContext, ModalPopupDispatchContext } from 'hoc/withModal'

import styles from './modal.module.css'

const ModalPopup = memo(() => {
  const { isOpen, title, className, component: Child } = useContext(ModalPopupStateContext)
  const { closeModal, onSubmitModal } = useContext(ModalPopupDispatchContext)
  return (
    <div
      id='modal'
      className={`${styles.modalPopup} ${
        isOpen
          ? 'modal ml-0 mt-0 show fade fixed top-0 left-0 z-10000 w-full h-full outline-none overflow-x-hidden overflow-y-auto'
          : 'hidden'
      } overflow-y-auto`}
      data-keyboard='false'
      data-backdrop='static'
      tabIndex={-1}
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className={`${className && className.dialog ? className.dialog : ''} modal-dialog`}>
        <div className={`${className && className.content ? className.content : ''} modal-content`}>
          <div className={`${className && className.header ? className.header : ''} modal-header`}>
            <h2 className='font-medium text-base mr-auto'>{title}</h2>
            <button
              onClick={closeModal}
              id='close-modal'
              type='button'
              className='w-8 h-8 text-gray-500'
            >
              X
            </button>
          </div>
          <Child />
        </div>
      </div>
    </div>
  )
})

export default ModalPopup
