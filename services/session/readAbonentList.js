const AbonentsModel = require("../../models/Abonents");

module.exports = async (req, res) => {
    const { list } = req.body.data;
    const models = await AbonentsModel.findAll({where: { check_code: list }});
    res.send({
        command:'read_abonent_list',	
        data: {
            list: models.map(v => ({check_code: v.check_code, key: v.id}))
        }
    })
}