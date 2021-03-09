const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    attendants: [{type : mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    startTime : {type : String, default : "M: 1, D: 1, Year: 2020"},
    endTime : {type : String, default : "M: 1, D: 1, Year: 2020"},
    Interval: {type: String, default :"0"}
}, {
    timestamps: true 
    //using this will make createdAt and UpdatedAt
    //we will fetch createdAt to display the time of meeting start
})

module.exports = mongoose.model("CallHistory", userSchema);