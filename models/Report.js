const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Interviewer: {type : mongoose.Schema.Types.ObjectId, ref: "Users"},
    Candidate: {type : mongoose.Schema.Types.ObjectId, ref: "Users"},
    startTime : {type : String, default : "M: 1, D: 1, Year: 2020"},
    endTime : {type : String, default : "M: 1, D: 1, Year: 2020"},
    QuizType: {type: Number, default: 1 },
    TotalScore: {type:Number, default: 10},
    userScore: {type: Number},
    correctAnswers: {type: Number},
    EmotionScore: {type: Number},
    InterviewResult: {type: "String", default: ""},
    Remarks: {type: 'String', default: ""} 
}, {
    timestamps: true 
    //using this will make createdAt and UpdatedAt
    //we will fetch createdAt to display the time of meeting start
})

module.exports = mongoose.model("Report", userSchema);