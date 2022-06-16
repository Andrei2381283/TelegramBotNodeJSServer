const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const Abonents = sequelize.define("abonents", {
    chat_id: DataTypes.INTEGER,
    session: DataTypes.STRING,
    check_code: DataTypes.INTEGER
})

module.exports = Abonents;