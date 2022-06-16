const SessionsModel = require("../../models/Sessions");
const AbonentsModel = require("../../models/Abonents");
const generateSessionToken = require("../../utils/generateSessionToken");

module.exports = async (req, res) => {
    const { id, type } = req.body.data;
    const [ model, created ] = await SessionsModel.findOrCreate({where: { app_id: id, type }});
    const session = generateSessionToken();
    if(model.session){
        const abonents = await AbonentsModel.findAll({where: {session: model.session}});
        for(const abonent of abonents){
            abonent.setDataValue("session", session);
            await abonent.save();
        }
    }
    model.setDataValue("session", session);
    await model.save();
    res.send({
        command:'new_app',	
        data: {
            id,
            session
        }
    })
}