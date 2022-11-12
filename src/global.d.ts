import React from "react";
import { Epic } from "redux-observable";
import "@testing-library/jest-dom/extend-expect"

import { AppState, EpicDependencies } from "redux/configureStore";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_AUTH_TOKEN: string;
            NODE_ENV: "development" | "production";
            PORT?: string;
            PWD: string;
        }
    }

    type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

    type Snackbar = {
        message: string;
        variant: "error" | "success" | "info";
        autohide?: boolean;
        actionBtn?: {
            name: string;
            className: string;
            callbackFunction: () => void;
        } | null;
    };

    interface CustomAction {
        type: string;
        payload?: any;
        error?: Error;
    }

    type CustomEpic = Epic<
        CustomAction,
        CustomAction,
        AppState,
        EpicDependencies
    >;

    type AjaxResponse<
        T extends {
            data: Record<string, unknown>;
        }
    > = {
        response: T;
    };

    type User = { id: number; email: string };
}
