const questions = require("../controllers/answer.controller");

module.exports = app => {

    const router = require("express").Router();

    // Check Answer of User
    router.post("/checkAnswer", questions.checkAnswer);

    // Get Answers
    router.get("/getAnswers", questions.getAllAnswer);

    // To Delete All Questions from Database
    router.delete("/deleteAnswers", questions.deleteAnswer);

    app.use("/api/answer", router);
};
