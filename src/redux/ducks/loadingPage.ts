import createReducer from '../../utils/createReducer'

export const LOADING_PAGE_TRIGGER = 'loadingPage/TRIGGER'

interface LoadingPageState {
  isTriggered: boolean
}

const INITIAL_STATE: LoadingPageState = {
  isTriggered: false,
}

export default createReducer(INITIAL_STATE, {
  [LOADING_PAGE_TRIGGER]: (state, action) => {
    state.isTriggered = action.payload
  },
})

export const triggerLoadingPage = (payload: boolean) => ({
  type: LOADING_PAGE_TRIGGER,
  payload,
})
