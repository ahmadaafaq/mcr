const Sequelize = require("sequelize");

//db configuration using Sequelize.js(ORM)
const sequelize = new Sequelize("task", "root", "task", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
