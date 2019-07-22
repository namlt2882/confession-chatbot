'use strict';
var routes = require('./src/routes')
exports.handler = (event, context, callback) => {
    var path = event.path;
    var method = event.httpMethod;
    // var header = event.headers;
    // var body = event.body;
    for (var i = 0; i < routes.length; i++) {
        if (routes[i].path.test(path)) {
            routes[i].router[method](event, context, callback)
            break;
        }
    }
}
