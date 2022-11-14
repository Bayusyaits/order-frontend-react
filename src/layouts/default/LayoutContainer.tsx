import React, { useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import type { ReactNode } from 'react'

import { snackbarClose } from 'redux/ducks/snackbar'
import withModal from 'hoc/withModal'

import { selectLayoutData } from './layoutSelector'
import LayoutView from './LayoutView'

const LayoutContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const layoutState = useSelector(selectLayoutData, shallowEqual)

  const handleSnackbarClose = useCallback(
    (el: string) => {
      dispatch(snackbarClose(el))
    },
    [dispatch],
  )

  return (
    <LayoutView {...layoutState} handleSnackbarClose={handleSnackbarClose}>
      {children}
    </LayoutView>
  )
}

export default withModal(LayoutContainer)
