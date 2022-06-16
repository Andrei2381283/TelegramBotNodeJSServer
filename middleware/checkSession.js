const SessionsModel = require("../models/Sessions");

module.exports = async (req,res,next) => {
    const session = req.body.session;
    if(await SessionsModel.findOne({where: { session }})) next();
    else res.status(400).send("Wrong session");
};