let { CHAT_STATUS_TABLE_URL, TABLES_HOST } = require('../config'),
    https = require('https');

function get(id, callback = function (data) { },
    errorCallback = function (err) { console.log(`Error when get chat status [id=${id}]: ${err}`) }) {
    var options = {
        host: TABLES_HOST,
        path: `${CHAT_STATUS_TABLE_URL}/${id}`,
        method: 'POST',
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
    req.on('error', errorCallback)
    req.end()
}

function insert(obj, callback = function (data) { },
    errorCallback = function (err) { console.log(`Error when insert chat status [id=${id}]: ${err}`) }) {
    var options = {
        host: TABLES_HOST,
        path: `${CHAT_STATUS_TABLE_URL}`,
        method: 'POST',
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
    req.on('error', errorCallback)
    req.write(JSON.stringify(obj))
    req.end()
}
function update(obj, callback = function (data) { },
    errorCallback = function (err) { console.log(`Error when update chat status [id=${id}]: ${err}`) }) {
    var options = {
        host: TABLES_HOST,
        path: `${CHAT_STATUS_TABLE_URL}/${obj.id}`,
        method: 'PUT',
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
    req.on('error', errorCallback)
    req.write(JSON.stringify(obj))
    req.end()
}

module.exports = { get, insert, update }
