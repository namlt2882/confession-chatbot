var { VERIFY_TOKEN, PAGE_ACCESS_TOKEN } = require('../config'),
    { devLog } = require('../utility/utility'),
    ConfessionBot = require('../service/confession-bot')

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
    var botInstance = new ConfessionBot()
    botInstance.on('ready', async function () {
        var responseMessages = botInstance.processMessage(messageText)
        for (m of responseMessages) {
            await sendTextMessage(senderID, m.text, m.buttons)
        }
    })
    botInstance.init(senderID)
}

function sendTextMessage(recipientId, messageText, fastResponses = []) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };
    if (fastResponses.length > 0) {
        messageData.message.quick_replies = fastResponses.map(response => ({
            "content_type": "text",
            "title": response,
            "payload": "<POSTBACK_PAYLOAD>"
        }))
    }
    return callSendAPI(messageData);
}
function callSendAPI(messageData) {
    var body = JSON.stringify(messageData);
    var path = '/v4.0/me/messages?access_token=' + PAGE_ACCESS_TOKEN;
    var options = {
        host: "graph.facebook.com",
        path: path,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return new Promise(function (resolve, reject) {
        var callback = function (response) {
            var data = ''
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                resolve(data)
                devLog('Message Sent!!!!!')
            });
        }
        var req = https.request(options, callback);
        req.on('error', function (e) {
            reject(e)
            console.log('problem with request: ' + e);
        });
        req.write(body);
        req.end();
    })

}
module.exports = { GET, POST }