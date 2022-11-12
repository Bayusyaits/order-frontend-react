import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

import configureStore  from 'redux/configureStore'
import Routes from './routes/index'
import Layout from './layouts/default'

export const store = configureStore()
export const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Routes />
          </Layout>
      </PersistGate>
    </Provider>
  )
}

export default App
