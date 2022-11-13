import { ajax } from 'rxjs/ajax'
import UrlPattern from 'url-pattern'
import queryString from 'query-string'
import { getLoginData } from './token'
import { EndPoint } from '../constants/endpoints'

function generateUrl(urlString: string, params = {}, query?: Record<string, unknown>): string {
  const uri = new UrlPattern(urlString).stringify(params)
  const url = import.meta.env.VITE_APP_APIURL
  if (typeof query === 'object') {
    const queries = Object.entries(query)
      .filter(([, val]) => {
        if (val === null || val === undefined || val === '' || val === 0) {
          return false
        }
        return true
      })
      .map(([key, val]: any) => {
        if (val.length) {
          return `${queryString.stringify({ [key]: val })}`
        }
        return `${key}=${encodeURIComponent(`${val}`)}`
      })
      .join('&')
    return `${url}/${uri}?${queries}`
  }
  return `${url}/${uri}`
}

function generateHeaders(contentType: string = 'application/json', lang: string = 'id') {
  const appSignature = import.meta.env.VITE_APP_APISIGNATURE
  const { token } = getLoginData()
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': contentType,
    Accept: contentType,
    'Accept-Language': lang,
    Authorization: `Bearer ${token ? token : ''}`,
    'X-Signature': appSignature,
  }
  return headers
}

interface Options {
  endpoint: EndPoint
  params?: Record<string, unknown>
  query?: Record<string, unknown>
  body?: Record<string, unknown>
  headers?: Record<string, unknown>
}

export default function api(options: Options) {
  const { endpoint, params = {}, query, body, headers } = options
  const [method, path] = endpoint
  const url = generateUrl(path, params, query)
  // const proxyUrl = 'http://localhost/call'
  const h = generateHeaders()
  if (headers && Object.keys(headers).length > 0) {
    Object.assign(h, { ...headers })
  }
  const obj = {
    method,
    headers: h,
    url,
    body,
  }
  return ajax(obj)
}
