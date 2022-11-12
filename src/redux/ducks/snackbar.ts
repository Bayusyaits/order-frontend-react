import type { AjaxError } from "rxjs/ajax";

import createReducer from "utils/createReducer";

export const SNACKBAR_OPEN = "SNACKBAR_OPEN";
export const SNACKBAR_CLOSE = "SNACKBAR_CLOSE";

export interface AlertState {
  id: string
  open?: boolean;
  message: string;
  code: number;
  status?: "error" | "success" | "info";
  autohide?: boolean;
  actionBtn?: {
      name: string;
      className: string;
      callbackFunction: () => void;
  } | null;
}
interface SnackbarState {
    alerts: AlertState[]
}

const INITIAL_STATE: SnackbarState = {
    alerts: []
};

export default createReducer(INITIAL_STATE, {
    [SNACKBAR_OPEN]: (state, action) => {
      const {alerts} = state
      const { payload: value } = action
      if (alerts && alerts[0] && alerts[0].id &&
          value && value.id) {
          for (let i = 0; i < alerts.length; i++) {
              if (alerts[i] && alerts[i].message &&
                  alerts[i].id === value.id) {
                  state.alerts[i] = value
                  break
              } else if (alerts[i] && alerts[i].message &&
                alerts[i].id !== value.id) {
                state.alerts.push(value)
                break
              }
          }
      } else if (value && value.id) {
        state.alerts.push(value)
      }
    },
    [SNACKBAR_CLOSE]: (state, action) => {
      const alerts = {...state.alerts}
      const id = action.payload
      if (alerts && alerts[0] && alerts[0].id &&
        id) {
        for (let i = 0; i < alerts.length; i++) {
          if (alerts[i] && alerts[i].id &&
              alerts[i].id === id) {
              alerts.splice(i, 1)
              break
          }
        }
      }
    }
});

export function snackbarOpen(payload: AlertState) {
    return {
        type: SNACKBAR_OPEN,
        payload,
    };
}
type ErrorParams = AjaxError | AlertState | string;

export function snackbarError(error: ErrorParams) {
    let message;
    const obj = (error as AlertState)
    if (
        error &&
        ((error as AjaxError).status === 0 ||
            (error as AjaxError).message === "ajax error")
    ) {
        message =
            "No internet connection. Make sure that Wi-Fi or internet data is turned on, then try again.";
    } else if (error) {
        message =
            (error as AjaxError).response?.message ||
            (error as AlertState).message ||
            error;
    } else {
        message = "Unknown Error";
    }
    return {
        type: SNACKBAR_OPEN,
        payload: {
            ...obj,
            message,
        },
    };
}

export function snackbarClose(payload: string) {
    return {
        type: SNACKBAR_CLOSE,
        payload
    };
}
