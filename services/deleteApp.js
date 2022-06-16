const AbonentsModel = require("../models/Abonents");
const SessionsModel = require("../models/Sessions");
const bot = require("../bot");

const awaitDeleteAbonents = [];

bot.on("message", async (msg) => {
    if(awaitDeleteAbonents.includes(msg.chat.id)){
        const session = await SessionsModel.findOne({ where: { type: msg.text } });
        if(session){
            await AbonentsModel.destroy({ where: { chat_id: msg.chat.id, session: session.session } });
            bot.sendMessage(msg.chat.id, "Приложение удалено", {
                reply_markup: { 
                    remove_keyboard: true
                }
            });
        }
    }
})

module.exports = async (msg) => {
    const types = [];
    const abonents = await AbonentsModel.findAll({ where: { chat_id: msg.chat.id } });
    for(const abonent of abonents){
        const session = await SessionsModel.findOne({ where: { session: abonent.session } });
        types.push(session.type);
    }
    awaitDeleteAbonents.push(msg.chat.id);
    bot.sendMessage(msg.chat.id, "Какое приложение удалить?", {
        reply_markup: { 
            "keyboard": [
                types.map(v => ({text: v}))
            ], 
            "resize_keyboard": true, 
            "one_time_keyboard": true 
        }
    });
}