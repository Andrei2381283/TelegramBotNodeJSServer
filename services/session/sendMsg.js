const AbonentsModel = require("../../models/Abonents");
const bot = require("../../bot");

module.exports = async (req, res) => {
    const { key, text_msg } = req.body.data;
    const model = await AbonentsModel.findOne({where: { id: key }});
    if(!model || !model.chat_id) return res.send({
        command:'send_msg',	
        data: {
            key,
            result: "User doesnt send check_code to telegram bot"
        }
    })
    try {
        bot.sendMessage(model.chat_id, text_msg);
        res.send({
            command:'send_msg',	
            data: {
                key,
                result: 'ok'
            }
        })
    } catch(err){
        console.log(err);
        res.send({
            command:'send_msg',	
            data: {
                key,
                result: 'error'
            }
        })
    }
}