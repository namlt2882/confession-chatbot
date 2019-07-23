var { IS_DEV_ENV } = require('../config')

function devLog(message) {
    if (IS_DEV_ENV == 'true')
        console.log(message)
}

function parseParams(query) {
    var params = {};
    query.split('&').forEach((keyval) => {
        keyval = keyval.split('=');
        params[keyval[0]] = keyval[1]
    })
    return params;
}

module.exports = {
    devLog, parseParams
}