import createReducer from '../../utils/createReducer'

export const IFRAME_CHECK = 'iframe/CHECK'
export const IFRAME_ON_MESSAGE = 'iframe/ON_MESSAGE'

interface IframeState {
  isInIframe: boolean | null,
}

const INITIAL_STATE: IframeState = {
  isInIframe: null,
}

export default createReducer(INITIAL_STATE, {
  [IFRAME_CHECK]: (state) => {
    state.isInIframe = window.self !== window.top
  },
})

export function iframeCheck() {
  return {
    type: IFRAME_CHECK,
  }
}
