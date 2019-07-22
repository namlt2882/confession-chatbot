var { IS_DEV_ENV } = require('../config')

function devLog(message) {
    if (IS_DEV_ENV == 'true')
        console.log(message)
}

module.exports = {
    devLog
}