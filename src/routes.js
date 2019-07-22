var webhook = require('./router/webhook')
var routes = [
    {
        path: /^\/webhook/,
        router: webhook
    }
]
module.exports = routes