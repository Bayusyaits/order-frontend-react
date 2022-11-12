import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from 'react'
import produce, { Immutable } from 'immer'

export interface Props {
  isOpen?: boolean
  id?: string
  size?: string
  isFix?: boolean
  isInput?: boolean
  required?: boolean
  classesName?: string
  autocomplete?: string
  placeholder?: string
  errorMessage?: string
  disabled?: boolean
  value?: string
  isIcon?: boolean
  isApi?: boolean
  onKeyDown?: any
  setSearch?: any
  setValue: (val: string) => void
  onCloseSelect: () => void
  onSelected: () => void
  data?: any[]
}

export const initialState: Props = {
  isOpen: false,
  id: '',
  isFix: true,
  isInput: true,
  required: true,
  classesName: '',
  autocomplete: '',
  placeholder: '',
  errorMessage: '',
  disabled: false,
  value: '',
  setValue: () => {
    /* */
  },
  setSearch: () => {
    /* */
  },
  onCloseSelect: () => {
    /* */
  },
  onSelected: () => {
    /* */
  },
  data: [],
}
export const SelectContext = createContext<Props>(initialState)
export const useSelectContext = () => useContext(SelectContext)
