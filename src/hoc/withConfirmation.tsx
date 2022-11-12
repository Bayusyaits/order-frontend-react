import React, { createContext, useContext, useMemo, useReducer, useCallback } from 'react'
import produce, { Immutable } from 'immer'

import ConfirmationPopup from '../components/confirmationPopup'

export type ConfirmationPopupState = {
  isOpen: boolean
  title?: string
  message: string
  component: React.ComponentType
  btnConfirmName?: string
  btnCancelName?: string
  onSubmit?: () => void
  onClose?: () => void
}

type OpenConfirmationArgs = Omit<ConfirmationPopupState, 'isOpen'>

type ConfirmationPopupAction = {
  type: 'OPEN_CONFIRMATION_POPUP' | 'CLOSE_CONFIRMATION_POPUP'
  payload?: Partial<ConfirmationPopupState>
}

export type ConfirmationPopupDispatch = {
  openConfirmation: (args: OpenConfirmationArgs) => void
  closeConfirmation: () => void
  onSubmitConfirmation: () => void
}

export type ConfirmationPopupContext = {
  state: Immutable<ConfirmationPopupState>
  dispatch: ConfirmationPopupDispatch
}

interface UseConfirmation
  extends Pick<ConfirmationPopupState, 'isOpen'>,
    Omit<ConfirmationPopupDispatch, 'onSubmitConfirmation'> {}

// Initial state confirmation popup
const initialState: ConfirmationPopupState = {
  title: 'Confirmation',
  isOpen: false,
  message: '',
  btnConfirmName: 'Confirm',
  btnCancelName: 'Cancel',
  component: () => (<></>),
  onSubmit: () => {
    /* */
  },
  onClose: () => {
    /* */
  },
}

// Create context for state & dispatch confirmation popup
export const ConfirmationPopupStateContext: React.Context<
  Immutable<ConfirmationPopupState>
> = createContext(initialState as Immutable<ConfirmationPopupState>)

export const ConfirmationPopupDispatchContext = createContext<ConfirmationPopupDispatch>({
  openConfirmation: () => {
    /* */
  },
  closeConfirmation: () => {
    /* */
  },
  onSubmitConfirmation: () => {
    /* */
  },
})

// Reducer for manage state confirmation popup
const reducer = produce((draft: ConfirmationPopupState, action: ConfirmationPopupAction) => {
  const { type, payload = {} } = action
  /* eslint-disable no-param-reassign */
  switch (type) {
    case 'OPEN_CONFIRMATION_POPUP':
      Object.keys(draft).forEach((objKey) => {
        const key = objKey as keyof ConfirmationPopupState
        ;(draft[key] as unknown) = payload[key] || initialState[key]
      })
      draft.isOpen = true
      return
    case 'CLOSE_CONFIRMATION_POPUP':
      draft.isOpen = false
      return
    default:
      throw new Error('Unknown action type')
  }
  /* eslint-enable no-param-reassign */
})

// Custom hooks method confirmation popup
function useConfirmationPopup(): ConfirmationPopupContext {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { onClose, onSubmit, ...popupProps } = state

  const openConfirmation = useCallback((args: OpenConfirmationArgs) => {
    dispatch({
      type: 'OPEN_CONFIRMATION_POPUP',
      payload: { ...args },
    })
  }, [])

  const closeConfirmation = useCallback(() => {
    if (typeof onClose === 'function') onClose()
    dispatch({
      type: 'CLOSE_CONFIRMATION_POPUP',
    })
  }, [onClose])

  const onSubmitConfirmation = useCallback(() => {
    if (typeof onSubmit === 'function') onSubmit()
    closeConfirmation()
  }, [closeConfirmation, onSubmit])

  return useMemo(
    () => ({
      state: popupProps,
      dispatch: {
        openConfirmation,
        closeConfirmation,
        onSubmitConfirmation,
      },
    }),
    [popupProps, openConfirmation, closeConfirmation, onSubmitConfirmation],
  )
}

// Custom hooks for use in other components
export function useConfirmation(): UseConfirmation {
  const { isOpen } = useContext(ConfirmationPopupStateContext)
  const { onSubmitConfirmation, ...dispatch } = useContext(ConfirmationPopupDispatchContext)
  return { isOpen, ...dispatch }
}

// HOC to wrap context confirmation popup
const withConfirmation = <P extends Record<string, unknown> = Record<string, unknown>>(
  Component: React.ComponentType<P>,
) => (props: P) => {
  const { state, dispatch } = useConfirmationPopup()
  return (
    <ConfirmationPopupDispatchContext.Provider value={dispatch}>
      <ConfirmationPopupStateContext.Provider value={state}>
        <ConfirmationPopup />
        <Component {...props} />
      </ConfirmationPopupStateContext.Provider>
    </ConfirmationPopupDispatchContext.Provider>
  )
}

export default withConfirmation
