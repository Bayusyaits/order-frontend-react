import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from "redux/ducks/user";
import snackbar from "redux/ducks/snackbar";
import iframe from "redux/ducks/iframe";
import loadingPage from "redux/ducks/loadingPage";
import order from "redux/ducks/order";
import product from "redux/ducks/product";
const rootPersistConfig = {
  key: 'bayusyaits-frontend-react',
  storage,
  whitelist: []
}

const rootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  user,
  snackbar,
  iframe,
  loadingPage,
  order,
  product
})


export default function createRootReducer(history: History) {
  return persistReducer(rootPersistConfig, rootReducer(history));
}
