import { createContext, useContext } from 'react'
export interface Props {
  isOpen?: boolean
  id?: string
  showCode?: boolean
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
  showCode: false,
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
