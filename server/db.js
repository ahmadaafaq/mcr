var mysql = require("mysql");
var sequelize = require("./sequelize");
var db;

//making database connection
function connectDatabase() {
  if (!db) {
    db = sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch(err => {
        console.error("Unable to connect to the database:", err);
      });
  }
  return db;
}
module.exports = connectDatabase();
