import { Endpoint, BlobEndpoint } from 'types'
export type EndPoint = Endpoint
//product
export const PRODUCT_GET: Endpoint = ['get', 'v1/product']
// order
export const ORDER_GET: Endpoint = ['get', 'v1/order']
export const ORDER_POST: Endpoint = ['post', 'v1/order/:uri']
// user
export const USER_LOGIN_POST: BlobEndpoint = ['post', 'v1/user/login', { blob: true }]
export const USER_REGISTRATION_POST: BlobEndpoint = ['post', 'v1/user/registration', { blob: true }]
