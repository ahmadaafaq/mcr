var UserModel = require("./User");
var bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//get user by name and compare password for login
exports.getUserByUsername = username => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ where: { username: username } })
      .then(user => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Unknown User"));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

//comparing passwords
exports.comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (isMatch) {
        resolve(isMatch);
      } else {
        reject(new Error("Invalid password"));
      }
    });
  });
};

//get user by Id
exports.getUserById = (id, callback) => {
  UserModel.findOne({ where: { id: id } }, callback);
};

//sign up user
exports.signup = (req, res) => {
  var today = new Date();

  //password encryption
  createHash(req.body.password).then(password => {
    var users = {
      username: req.body.username,
      email: req.body.email,
      password: password,
      created_at: today
    };
    UserModel.build(users) //insert user
      .save()
      .then(saved => {
        res.send({
          code: 200,
          message: "user signed up sucessfully"
        });
      })
      .catch(error => {
        res.send({
          code: 400,
          message: "error ocurred",
          error
        });
      });
  });
};

//create password hash (bcryct.js)
function createHash(pwd) {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return err;
      bcrypt.hash(pwd, salt, function(err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  });
}
