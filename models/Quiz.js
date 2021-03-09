const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Interviewer: {type : mongoose.Schema.Types.ObjectId, ref: "Users"},
    Candidate: [{type : mongoose.Schema.Types.ObjectId, ref: "Users"}],
    startTime : {type : String, default : "M: 1, D: 1, Year: 2020"},
    endTime : {type : String, default : "M: 1, D: 1, Year: 2020"},
    QuizType: {type: Number, default: 1 }, //1 for mcqs and 0 for form
    MCQs: [
        {
        MCQ_Number: {
            type:Number
        },
        Question: {
            type: String 
        },
        Answer: {
            type: String
        },
        Options: [{type: String}]
    }],
    Form: [ {
        Question_Number: {
            type:Number
        },
        Question: {
            type: String 
        },
    }],
    Score: {type : Number, default: 10}
}, {
    timestamps: true 
    //using this will make createdAt and UpdatedAt
    //we will fetch createdAt to display the time of meeting start
})

module.exports = mongoose.model("Quiz", userSchema);