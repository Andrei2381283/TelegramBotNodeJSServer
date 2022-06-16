const { Op } = require("sequelize");
const AbonentsModel = require("../../models/Abonents");
const generateCheckCode = require("../../utils/generateCheckCode");

setInterval(async () => {
    const models = await AbonentsModel.findAll({ where: { createdAt: { [Op.lte]: new Date(Date.now() - 1000*60*60) }, check_code: { [Op.not]: null } } });
    models.forEach(async (element) => {
        element.setDataValue("check_code", null);
        await element.save();
    });
}, 60*1000)._onTimeout();

module.exports = async (req, res) => {
    const session = req.body.session;
    const checkCode = generateCheckCode();
    await AbonentsModel.create({check_code: checkCode, session});
    res.send({
        command:'new_abonent',	
        data: {
            check_code: checkCode
        }
    })
}