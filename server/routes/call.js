const router = require('express').Router()
const fetch = require('node-fetch')

const apiHost = process.env.VITE_APP_APIHOST

function handleResponse(response) {
    return response.json().then((json) => (response.ok ? json : Promise.reject(json.error)))
}

function stringify(obj) {
    return JSON.stringify(obj, null, 2)
}

router.post('/', (req, res, next) => {
    const { Authorization, url, method, body } = req.body

    const uri = `${apiHost}${url}`
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Accept-Language": lang ? lang : "id",
            Authorization: `Bearer ${import.meta.env.VITE_APP_APIAUTHORIZATION}`,
            "X-Auth-Token": `Bearer ${token}`,
            "X-Auth-TimeStamp": timeStamp,
            "X-Auth-Signature": signature,
            "X-Store-Contact-Code": "19037950766"
        }
    }
    if (method && method.toLowerCase() !== 'get') {
        options.body = JSON.stringify(body)
    }

    console.log(`[CALL] ${uri}`)
    console.log(`[OPTIONS] ${options}`)

    return fetch(uri, options)
        .then(handleResponse)
        .then((json) => res.json(json))
        .catch(next)
})

module.exports = router