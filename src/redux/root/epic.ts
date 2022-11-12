import { combineEpics } from "redux-observable";

import * as user from "../epics/user";
import * as product from "../epics/product";
import * as order from "../epics/order";

export default combineEpics<any>(
    ...Object.values(user),
    ...Object.values(product),
    ...Object.values(order)
);
