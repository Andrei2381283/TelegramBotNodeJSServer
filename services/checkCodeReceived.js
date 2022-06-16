const { Op } = require("sequelize");
const AbonentsModel = require("../models/Abonents");

module.exports = async (msg, check_code) => {
    const model = await AbonentsModel.findOne({ where: { check_code } });
    if(model) {
        await AbonentsModel.destroy({ where: { chat_id: msg.chat.id, session: model.session, check_code: { [Op.not]: check_code } } });
        model.setDataValue("chat_id", msg.chat.id);
        await model.save();
    }
}