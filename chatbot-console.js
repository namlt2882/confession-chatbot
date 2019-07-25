let ConfessionBot = require('./src/service/confession-bot')
function test() {
    var botInstance = new ConfessionBot();
    var stdin = process.openStdin()
    botInstance.on('ready', function () {
        console.log('---------------Confession Chatbot--------------')
        console.log('-------------------Start chat------------------')
        stdin.addListener('data', function (buffer) {
            var responseMessages = botInstance.processMessage(buffer.toString('utf-8').trim())
            responseMessages.forEach(m => {
                console.log(m.text)
                if (m.buttons && m.buttons.length > 0) {
                    var option = '';
                    m.buttons.forEach(btn => { option += `| ${btn}` })
                    console.log(option)
                }
            })
        })
    })
    botInstance.init(-1)
}
test();