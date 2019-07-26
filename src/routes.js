let webhook = require('./router/webhook'),
    publicRouter = require('./router/public-router')
var routes = [
    {
        path: /^\/confession-chatbot\/webhook/,
        router: webhook
    },
    {
        path: /^\/confession-chatbot[\s\S]*/,
        router: publicRouter
    }
]
module.exports = routes