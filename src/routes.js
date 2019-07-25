var webhook = require('./router/webhook')
var routes = [
    {
        path: /^\/confession-chatbot\/webhook/,
        router: webhook
    }
]
module.exports = routes