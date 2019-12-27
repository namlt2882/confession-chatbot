let { STAGING_CONFESSION_URL } = require('../config'),
    { sendPOST, sendPUT } = require('./basic-table');

function getAll(callback, onError) {
    sendPOST(`${STAGING_CONFESSION_URL}/getall`, function(data) {
        data = JSON.parse(data)
        if(data) {
            data = data.map(function(val) {
                if (val.content)
                    val.content = Buffer.from(val.content, 'base64').toString()
                val.insertedDate = Date.parse(val.insertedDate)
                val.updatedDate = Date.parse(val.updatedDate)
                return val
            })
        }
        callback(data)
    }, onError)
}

function insert(obj, callback, onError) {
    // TODO: find a new way to generate id
    obj.id = "" + new Date().getTime() + Math.floor(Math.random() * 1000)
    sendPOST(`${STAGING_CONFESSION_URL}`, callback, onError, process(obj))
}

function update(obj, callback, onError) {
    sendPUT(`${STAGING_CONFESSION_URL}/${obj.id}`, callback, onError, process(obj))
}

function process(obj) {
    var clone = {...obj}
    if(clone.content)
        clone.content = Buffer.from(clone.content).toString('base64')
    clone.updatedDate = new Date()
    return clone
}

const STATUS = {
    NEW: 0,
    APPROVED: 1,
    DELETED: -1
}

module.exports = { getAll, insert, update, STATUS }