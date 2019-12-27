let { TABLES_HOST } = require('../config'),
    https = require('https');

function errorCallback(err) {
    console.error(`${err}`)
    throw err
}

function sendPOST(path, callback, onError = errorCallback, body) {
    sendRequest('POST', path, callback, onError, body)
}

function sendPUT(path, callback, onError = errorCallback, body) {
    sendRequest('PUT', path, callback, onError, body)
}

function sendRequest(method, path, callback, onError = errorCallback, body) {
    var options = {
        host: TABLES_HOST,
        path: path,
        method: method,
        headers: { 'Content-Type': 'application/json' }
    }
    var req = https.request(options, function (res) {
        let data = ""
        res.on('data', function (chunk) {
            data += chunk
        })
        res.on('end', function () {
            callback(data)
        })
    })
    req.on('error', onError)
    if (body) {
        req.write(JSON.stringify(body))
    }
    req.end()
}

module.exports = {
    errorCallback,
    sendPOST,
    sendPUT
}