let fs = require('fs'),
    path = require('path')
function GET(event, context, callback) {
    retrieveFile(event, context, callback)
}

function POST(event, context, callback) {
    retrieveFile(event, context, callback)
}

function retrieveFile(event, context, callback) {
    var fileLocation = event.path;
    if (fileLocation.match(/^\/confession-chatbot$/)) {
        fileLocation = fileLocation.replace('/confession-chatbot', '')
    } else {
        fileLocation = fileLocation.replace('/confession-chatbot/', '')
    }
    if (fileLocation == '') {
        fileLocation = 'index.html'
    }
    fileLocation = path.resolve(__dirname, `./../../public/${fileLocation}`)
    fs.readFile(fileLocation, function (err, data) {
        var response;
        if (err) {
            response = {
                'body': '404',
                'statusCode': 404
            }
            console.log(err)
        } else {
            response = {
                'body': data.toString('utf8'),
                'statusCode': 200,
                'headers': {'Content-Type':getMimes(fileLocation)}
            }
        }
        callback(null, response)
    })
}
function getMimes(file){
    if(file.endsWith('.html')){
        return 'text/html'
    }
    if(file.endsWith('.css')){
        return 'text/css'
    }
}
module.exports = { GET, POST }
