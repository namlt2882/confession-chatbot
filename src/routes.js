let webhook = require('./router/webhook'),
    publicRouter = require('./router/public-router'),
    stagingConfessionRouter = require('./router/staging-confession-router')
var routes = [
    {
        path: /^\/confession-chatbot\/webhook/,
        router: webhook
    },
    {
        path: /^\/confession-chatbot\/public[\s\S]*/,
        router: publicRouter
    },
    {
        path: /^\/confession-chatbot\/staging-confession[\s\S]*/,
        router: stagingConfessionRouter
    }
]
module.exports = routes