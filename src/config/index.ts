const CLIENT_ID = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;
const HOST = import.meta.env.REACT_APP_SERVER_HOST;
// eslint-disable-next-line prefer-destructuring
const NODE_ENV = import.meta.env.NODE_ENV;
const PROXY_PORT = import.meta.env.REACT_APP_SERVER_PORT;
const getSignedURLEndpoint =
    NODE_ENV === "development"
        ? `${HOST}:${PROXY_PORT}/get-signed-url`
        : `${HOST}/get-signed-url`;
const SMD_URL = import.meta.env.REACT_APP_SMD_URL;

export default {
    CLIENT_ID,
    HOST,
    NODE_ENV,
    PROXY_PORT,
    getSignedURLEndpoint,
    SMD_URL,
};
