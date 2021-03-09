const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type : String,
        required: [true, "Please enter your email!"],
        trim: true
    },
    password: {
        type : String,
        required: [true, "Please enter your password!"]
    },
    role: {
        type : Number,
        default: 0 // 0 is user, 1 admin
    },
    avatar: {
        type : String,
        default: "https://res.cloudinary.com/xapper72/image/upload/v1605700455/avatar/pngformat_q8olt1.png"
    }   
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema);