var StagingConfession = require("../table/staging-confession-cb");

function GET(event, context, callback) {
  StagingConfession.getAll(
    function(data) {
        var response = {
            'body': data,
            'statusCode': 200
        };

        callback(null, response);
    },
    function(err) {
        console.error(err);
        var response = {
            'body': { error: err},
            'statusCode': 500
        };

        callback(null, response);
    }
  );
}

function POST(event, context, callback) {
    var body = JSON.parse(event.body)
    StagingConfession.update(body, function(data) {
        var response = {
            'body': data,
            'statusCode': 200
        };

        callback(null, response);
    }, function(err) {
        console.error(err);
        var response = {
            'body': { error: err},
            'statusCode': 500
        };

        callback(null, response);
    })
}

module.exports = { GET, POST };
