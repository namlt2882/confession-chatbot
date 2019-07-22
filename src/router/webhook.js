var { VERIFY_TOKEN, PAGE_ACCESS_TOKEN } = require('../config');
var { devLog } = require('../utility/utility')

var https = require('https');
function GET(event, context, callback) {
    var queryParams = event.queryStringParameters;

    var rVerifyToken = queryParams['hub.verify_token']

    if (rVerifyToken === VERIFY_TOKEN) {
        var challenge = queryParams['hub.challenge']

        var response = {
            'body': parseInt(challenge),
            'statusCode': 200
        };

        callback(null, response);
    } else {
        var response = {
            'body': 'Error, wrong validation token',
            'statusCode': 422
        };

        callback(null, response);
    }
}
function POST(event, context, callback) {
    var data = JSON.parse(event.body);

    // Make sure this is a page subscription
    if (data.object === 'page') {
        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function (entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;
            // Iterate over each messaging event
            entry.messaging.forEach(function (msg) {
                if (msg.message) {
                    receivedMessage(msg);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });

    }
    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    var response = {
        'body': "ok",
        'statusCode': 200
    };

    callback(null, response);
}
function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
    console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    devLog(JSON.stringify(message));
    var messageId = message.mid;
    var messageText = message.text;
    var messageAttachments = message.attachments;
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        // and send back the example. Otherwise, just echo the text we received.
        switch (messageText) {
            case 'generic':
                //sendGenericMessage(senderID);
                break;
            default:
                sendTextMessage(senderID, messageText);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
}
function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };
    callSendAPI(messageData);
}
function callSendAPI(messageData) {
    var body = JSON.stringify(messageData);
    var path = '/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN;
    var options = {
        host: "graph.facebook.com",
        path: path,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    var callback = function (response) {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            devLog('Message Sent!!!!!')
        });
    }
    var req = https.request(options, callback);
    req.on('error', function (e) {
        console.log('problem with request: ' + e);
    });

    req.write(body);
    req.end();
}
module.exports = { GET, POST }