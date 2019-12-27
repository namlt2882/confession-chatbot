let { CHAT_STATUS_TABLE_URL, TABLES_HOST } = require('../config'),
    https = require('https'),
    { sendPOST, sendPUT } = require('./basic-table');

function get(id, callback, errorCallback) {
    sendPOST(`${CHAT_STATUS_TABLE_URL}/${id}`, function(data) {
        data = JSON.parse(data)
        if (data && data.length != 0) {
            data = data[0]
            if (data.confessionContent)
                data.confessionContent = Buffer.from(data.confessionContent, 'base64').toString()
            data.insertedDate = Date.parse(data.insertedDate)
            data.updatedDate = Date.parse(data.updatedDate)
        }
        callback(data)
    }, errorCallback)
}

function insert(obj, callback, errorCallback) {
    sendPOST(`${CHAT_STATUS_TABLE_URL}`, callback, errorCallback, process(obj))
}
function update(obj, callback, errorCallback) {
    sendPUT(`${CHAT_STATUS_TABLE_URL}/${obj.id}`, callback, errorCallback, process(obj))
}

function process(obj) {
    var clone = {...obj}
    if (clone.confessionContent)
        clone.confessionContent = Buffer.from(clone.confessionContent).toString('base64')
    return clone
}

module.exports = { get, insert, update }
