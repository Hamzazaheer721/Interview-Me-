const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Interviewer: {type : mongoose.Schema.Types.ObjectId, ref: "Users"},
    Candidate: {type : mongoose.Schema.Types.ObjectId, ref: "Users"},
    startTime : {type : String, default : "M: 1, D: 1, Year: 2020"},
    endTime : {type : String, default : "M: 1, D: 1, Year: 2020"},
    QuizType: {type: Number, default: 1 },
    MCQs: [
        {
        MCQ_Number: {
            type:Number
        },
        Answer: {
            type: String
        },
    }],
    Form: [{
        Question_Number: {
            type:Number
        },
        Answer: {
            type: String
        }
    }],
    userScore: {type: Number},
    correctAnswers: {type: Number}, 
}, {
    timestamps: true 
    //using this will make createdAt and UpdatedAt
    //we will fetch createdAt to display the time of meeting start
})

module.exports = mongoose.model("QuizResponse", userSchema);