const questions = require("../controllers/questions.controller");

module.exports = app => {

    const router = require("express").Router();

    // Add New Question in Quiz
    router.post("/addQuestion", questions.addQuestion);

    // To Get All Questions in Quiz
    router.get("/getQuestions", questions.getQuestions);

    // To Delete All Questions from Database
    router.delete("/deleteQuestions", questions.deleteQuestions);

    app.use("/api/question", router);
};
