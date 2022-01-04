const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.questions = require("./questions.models")(mongoose);
db.answers = require("./answers.models")(mongoose);

module.exports = db;
