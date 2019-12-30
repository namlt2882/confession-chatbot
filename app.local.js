const app = require('./app')

var http = require('http'),
    { parseParams } = require('./src/utility/utility');
http.createServer(lambdaProxyWrapper(app.handler)).listen(8080); //the server object listens on port 8080

function lambdaProxyWrapper(handler) {
    return (req, res) => {
        var callback = (err, response) => {
            res.writeHead(response.statusCode, response.headers)
            if (typeof response.body != 'string')
                res.write(JSON.stringify(response.body))
            else
                res.write(Buffer.from(response.body))
            res.end()
        }
        
        // Here we convert the request into a Lambda event
        const event = {
            httpMethod: req.method,
            queryStringParameters: parseParams(require('url').parse(req.url).query),
            path: req.url,
            pathParameters: {
                proxy: req.params ? req.params[0] : undefined,
            }
        }

        if (req.url == 'GET') {
            handler(event, null, callback)
        } else {
            var body = ''
            req.on('data', function(chunk) {
                body += chunk
            })
            req.on('end', function() {
                event.body = body
                handler(event, null, callback)
            })
        }
    }
}