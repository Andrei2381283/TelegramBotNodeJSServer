const httpsSettings = {
    //key: fs.readFileSync(__dirname + '/private.key'),
    //cert: fs.readFileSync(__dirname + '/public.cert'),
    //pfx: fs.readFileSync(__dirname + '/test_cert.pfx'),
}


const express = require("express");
const os = require('os');
const fs = require("fs");
const app = express();

require("./logger/index")(app);
process.on('uncaughtException', function (err) {
    console.error('Caught exception: ', err);
});

const sequelize = require("./sequelize");
const bot = require("./bot");

app.use((req,res,next) => {
    //console.log("Check if express request ", res.headersSent)
    if(!res.headersSent) return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/routes"));

const PORT = 8443;

global.admin_key = "123123123";

const checkCodeReceived = require("./services/checkCodeReceived");

bot.onText(/[0-9][0-9][0-9][0-9][0-9][0-9]/, (msg, match) => {
    const resp = match[0];
    checkCodeReceived(msg, resp)
});

const deleteApp = require("./services/deleteApp");

bot.onText(/\/delete/, (msg, match) => {
    deleteApp(msg);
});

sequelize.sync().then(() => {
    console.log('');
    console.log("Successful connected to MySQL ", new Date());
    const isHttps = (httpsSettings.key && httpsSettings.cert) || httpsSettings.pfx;
    const server = isHttps ? require("https").createServer(httpsSettings, app) : require("http").createServer(app);
    server.listen(PORT, () => {
        bot.open(server);
        const ip_adresses = os.networkInterfaces();
        console.log('');
        for(const i in ip_adresses){
            for(const k in ip_adresses[i])if(ip_adresses[i][k].family == 'IPv4')console.log(`Server running at ${isHttps ? "https" : "http"}://${ip_adresses[i][k].address}:${PORT}`);
        }
        console.log("Server successfuly started ",  new Date());
    });
}).catch((err) => {
    console.log(err);
})