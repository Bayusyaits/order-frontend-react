import React, { memo, useContext } from 'react'
import {
  ConfirmationPopupStateContext,
  ConfirmationPopupDispatchContext,
} from 'hoc/withConfirmation'

import styles from './confirmation.module.css'

const ConfirmationPopup = memo(() => {
  const {
    isOpen,
    title,
    message,
    btnConfirmName,
    btnCancelName,
    component: Child
   } = useContext(
    ConfirmationPopupStateContext,
  )
  const { closeConfirmation, onSubmitConfirmation } = useContext(ConfirmationPopupDispatchContext)

  return (
    <div
      id="confirmation-modal"
      className={`${styles.confirmationModal} ${isOpen ? 'modal ml-0 mt-0 show fade fixed top-0 left-0 z-10000 w-full h-full outline-none overflow-x-hidden overflow-y-auto' : 'hidden'} overflow-y-auto`}>
      <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h2 className="font-medium text-base mr-auto">
                    {title} Title
                </h2>
            </div>
            <Child/>
            <div className="modal-footer text-right">
                <button
                  onClick={closeConfirmation}
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-outline-secondary w-32 mr-1">
                    {btnCancelName}
                  </button>
                <button
                  onClick={onSubmitConfirmation}
                  type="button"
                  className="btn btn-primary w-32">
                    {btnConfirmName}
                  </button>
            </div>
        </div>
      </div>
    </div>
  )
})

export default ConfirmationPopup
