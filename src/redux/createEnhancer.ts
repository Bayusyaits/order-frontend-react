import { compose } from 'redux'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const createEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createEnhancer
