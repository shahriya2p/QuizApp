const db = require("../models");
const Questions = db.questions;

// Add New Question in Quiz
exports.addQuestion = async (req, res) => {
    try {
        const newQuestion = new Questions({
            Question_text: req.body.question,
            Answer: req.body.answer,
            Options: {
                a: req.body.a,
                b: req.body.b,
                c: req.body.c,
            },
        });
        await newQuestion.save();
        console.log('Question saved successfully..!')
        res.status(201).send({
            success: true,
            message: 'Question saved successfully..!'
        });
    } catch (e) {
        console.log('Error ==>', e)
        res.status(400).send(e);
    }
};

// To Get All Questions in Quiz
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Questions.find();
        const questionArray = questions.map((res) => {
            return {
                Question: res.Question_text,
                Options: res.Options,
                id: res.id,
            }
        })
        res.status(201).send({
            success: true,
            data: questionArray,
        });
    } catch (e) {
        console.log('Error ==>', e)
        res.status(400).send(e);
    }
}

// To Delete All Questions from Database
exports.deleteQuestions = async (req, res) => {
    try {
        await Questions.deleteMany();
        res.status(201).send({
            success: true,
            message: 'All Questions Deleted Successfully...!',
        });
    } catch (e) {
        console.log('Error ==>', e)
        res.status(400).send(e);
    }
}


