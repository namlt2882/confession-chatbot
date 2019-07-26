const app = require('./app')

var http = require('http'),
    { parseParams } = require('./src/utility/utility');
http.createServer(lambdaProxyWrapper(app.handler)).listen(8080); //the server object listens on port 8080

function lambdaProxyWrapper(handler) {
    return (req, res) => {
        // Here we convert the request into a Lambda event
        const event = {
            httpMethod: req.method,
            queryStringParameters: parseParams(require('url').parse(req.url).query),
            path: req.url,
            pathParameters: {
                proxy: req.params ? req.params[0] : undefined,
            },
            body: req.body ? JSON.parse(req.body) : undefined,
        }

        return handler(event, null, (err, response) => {
            res.writeHead(response.statusCode, response.headers)
            if (typeof response.body != 'string')
                res.write(JSON.stringify(response.body))
            else
                res.write(Buffer.from(response.body))
            res.end()
        })
    }
}