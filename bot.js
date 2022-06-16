const TelegramBot = require('node-telegram-bot-api');
const TelegramWebhook = require("node-telegram-bot-api/src/telegramWebHook");

const token = '5514125159:AAGvJZ8f-YeD3jICGrXmuv8BQV9SyaKrTnE';

const bot = new TelegramBot(token, {
    webHook: {
        port: 8443,
        key: "", //Path to file with PEM private key for webHook server
        cert: "", //Path to file with PEM certificate (public) for webHook server
        autoOpen: false
    }
});

bot.open = (server) => {
    const _webHook = new TelegramWebhook(bot);
    server.prependListener("request", async (req, res) => {
        //const startTime = Date.now();
        //console.log("Check if bot message");
        await new Promise((resolve, reject) => {
            const newRes = {
                end: (text) => {
                    if(newRes.statusCode != 401) {
                        res.statusCode = newRes.statusCode || 200;
                        res.end(text || "");
                    }
                    resolve();
                }
            };
            return _webHook._requestListener(req, newRes);
        });
        //console.log("Checking bot message done for ", Date.now() - startTime, " ms");
    });
    _webHook._webServer = server;
    bot._webHook = _webHook;
    _webHook._open = true;
}

bot.setWebHook('https://msg-api.il-soft.ru/' + token, {
    //certificate: 'path/to/crt.pem', // Path to your crt.pem  (только если сертификат самоподписанный)
});

bot.setMyCommands([
    {
        command: "delete",
        description: "Delete app"
    }
])

module.exports = bot;