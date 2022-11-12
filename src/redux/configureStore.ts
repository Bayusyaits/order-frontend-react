import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import authMiddleware from "middleware/authMiddleware";
import api from "../utils/api";
import getSignedUrl from "../utils/getSignedUrl";

import createEnhancer from './createEnhancer'
import createRootReducer from "./root/reducer";
import rootEpic from "./root/epic";

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const epicMiddleware = createEpicMiddleware({
        dependencies: {
            api,
            getSignedUrl,
        },
    });

    const middlewares =
        import.meta.env.NODE_ENV !== "production"
            ? [epicMiddleware, routerMiddleware(history)]
            : [epicMiddleware, routerMiddleware(history)];
    const enhancer = createEnhancer(applyMiddleware(...middlewares, authMiddleware))
    const store = createStore(
        createRootReducer(history),
        enhancer
    );

    epicMiddleware.run(rootEpic);

    return store;
}
