const db = require("../models");
const Questions = db.questions;
const Answers = db.answers;

// Check Answer For User
exports.checkAnswer = async (req, res) => {
    try {
        const existingQues = await Questions.findOne({_id: req.body.questionId});
        if(!existingQues){
            console.log(`Question with id: ${req.body.questionId} not Exist`);
            res.status(400).send(`Question with id: ${req.body.questionId} not Exist`);
        } else {
            if(!Object.values(existingQues.Options).includes(req.body.selectedAnswer)) {
                console.log(`Option ${req.body.selectedAnswer} in Question not Exist`);
                res.status(400).send(`Option ${req.body.selectedAnswer} in Question not Exist`);
            } else {
                const newAnswer = Answers({
                    question_id: req.body.questionId,
                    selectedAnswer: req.body.selectedAnswer,
                    user: req.body.user,
                    result: req.body.selectedAnswer === existingQues.Answer,
                })
                await newAnswer.save();
                res.status(201).send({
                    success: true,
                    message: 'Answer saved successfully..!',
                    answer_result: req.body.selectedAnswer === existingQues.Answer,
                });
            }
        }
    } catch (e) {
        console.log('Error ==>', e)
        res.status(400).send(e);
    }
};

// To Get All Answers from DB
exports.getAllAnswer = async (req, res) => {
    try {
        const ans = await Answers.find();
        res.status(201).send({
            success: true,
            data: ans,
        });
    } catch (e) {
        console.log('Error ==>', e)
        res.status(400).send(e);
    }
}

// To Delete All Answers from Database
exports.deleteAnswer = async (req, res) => {
    try {
        await Answers.deleteMany();
        res.status(201).send({
            success: true,
            message: 'All Answers Deleted Successfully...!',
        });
    } catch (e) {
        console.log('Error ==>', e)
        res.status(400).send(e);
    }
}


