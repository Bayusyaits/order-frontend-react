const router = require('express').Router()
const formidable = require('formidable')
const fetch = require('node-fetch')
const { URL } = require('url')
const fs = require('fs')
const FormData = require('form-data')

const { whiteListHeaders } = require('../constants/whiteListHeaders')

const apiHost = import.meta.env.VITE_APP_APIURL

function handleResponse(response) {
  if (response.status === 204) return null
  return response
    .json()
    .then((json) =>
      response.ok
        ? json
        : Promise.reject(Object.prototype.hasOwnProperty.call(json, 'error') ? json.error : json),
    )
}

router.post('/', (req, res, next) => {
  const form = formidable({ multiples: true })

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    if (!files.file) {
      return next({
        code: 400,
        message: 'File not found',
      })
    }
    const { Authorization, url, method, warehouseID, isBlob } = fields

    const uri = `${apiHost}/${url}`

    const formData = new FormData()
    formData.append('file', fs.createReadStream(files.file.path))

    const options = {
      method,
      headers: {
        Authorization,
        ...(warehouseID && {
          'warehouse-id': +warehouseID,
        }),
      },
      body: formData,
    }

    const optionsForLogging = {
      ...options,
      body: `FormData (file: ${files.file.name})`,
    }
    console.log(`[UPLOAD] ${uri}`)
    console.log(`[OPTIONS] ${JSON.stringify(optionsForLogging, null, 2)}`)

    if (isBlob) {
      return fetch(new URL(uri), options)
        .then((response) => {
          response.headers.forEach((value, key) => {
            if (whiteListHeaders.includes(key)) {
              res.set(key, value)
            }
          })
          return response.ok ? response.blob() : Promise.reject(response)
        })
        .then((blob) =>
          blob.arrayBuffer().then((buffer) => {
            res.send(Buffer.from(buffer))
          }),
        )
        .catch((errorResponse) => {
          const code = (errorResponse && errorResponse.status) || 500
          return errorResponse
            .json()
            .then((json) => {
              const error = { ...json.error, code }
              return next(error)
            })
            .catch(() => {
              const error = {
                message: 'Error response is not a valid JSON',
                code,
              }
              return next(error)
            })
        })
    }

    return fetch(new URL(uri), options)
      .then(handleResponse)
      .then((json) => res.json(json))
      .catch(next)
  })
})

module.exports = router
