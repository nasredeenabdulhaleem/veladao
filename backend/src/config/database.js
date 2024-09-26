// backend/src/config/database.js
// const settle = require("../../../../../../../Insolify/Settle-packages/settle-js")

const Sequelize = require("sequelize");


const database = new Sequelize("database_name", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = database;
