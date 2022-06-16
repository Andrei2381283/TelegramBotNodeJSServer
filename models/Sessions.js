const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const Sessions = sequelize.define("sessions", {
    session: DataTypes.STRING,
    app_id: DataTypes.STRING,
    type: DataTypes.STRING
})

module.exports = Sessions;