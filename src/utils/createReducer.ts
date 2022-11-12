import produce from 'immer'
import { Reducer } from 'redux'

interface Action {
  type: string
  payload?: any
  meta?: string
  error?: any
}

interface FnMap<T> {
  [key: string]: (draft: T, action: Action) => any
}

const createReducer = <T>(initialState: T, fnMap: FnMap<T>) =>
  produce((draft, action) => {
    const callback = fnMap[action.type]
    if (callback) {
      return callback(draft, action)
    }
    return undefined
  }, initialState as any) as Reducer<T, Action>

export default createReducer
