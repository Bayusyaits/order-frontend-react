import React from 'react'
import { shallowEqual, useSelector } from "react-redux";
import { AlertState } from 'redux/ducks/snackbar'

import {snackbarData} from './snackbarSelector'
import styles from './snackbar.module.css'
import { XCircle } from 'react-feather'

interface Props {
  onClose: (val: any) => void
  autohide?: boolean
  actionBtn?: {
    name: string
    className: string
    callbackFunction: () => void
  } | null
}

const SnackbarView: React.FC<Props> = (props) => {
  const { alerts } = useSelector(snackbarData, shallowEqual);
  const renderActionButton = (el: string) => {
    return (
      <button
        onClick={() => props.onClose(el)}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close">
        <XCircle className="w-6 h-6 mr-2"/>
      </button>
    )
  }
  const alert = (el: AlertState) => {
    return (
      <div
        key={el.id}
        id={el.id}
        className={`${styles.snackbarAlert} ${Number(el.code) < 300 && Number(el.code) >= 200 ? 'alert-outline-primary' : 'alert-outline-danger'} alert alert-dismissible show flex items-center mb-2" role="alert`}>
        {renderActionButton(el.id)} {el.message}
      </div>
    )
  }
  return (
    <div
    className={`${styles.snackbar} fixed z-10 left-15 w-auto flex flex-col items-start justify-center mb-5`}
    role="alert"
    aria-live="polite">
      { alerts.map((el: AlertState) => alert(el)) }
    </div>
  )
}

export default SnackbarView
