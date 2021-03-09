require('dotenv').config()
const express = require('express')
const app = express();
const http = require("http");
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// const server = http.createServer(app);
const server = require('http').Server(app);
const socket = require("socket.io");
const io = require('socket.io')(server);
// const io = socket(server)
 const users = {};
// const users = [];
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

//connect to mongoDb
const URL =  process.env.MONGODB_URL
// mongoose.connect(URL, {
//     useCreateIndex: true,
//     useFindAndModify: false, //to avoid depreciation error
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }, err => {
//     if (err) throw err;
//     console.log("Connected to Mongodb");
// })
mongoose
     .connect( URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
// Routes
app.use('/user', require('./routes/userRouter.js'))
app.use('/api', require('./routes/upload'))
app.use("/api/test", require("./routes/test"));


console.log("users are :", users)
//call code
io.on('connection', socket => {
    // console.log("success                 heyyy,", socket.id)
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
        
        // users[socket.id] = users;
        console.log("users are now",users)
    }
    
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })

    socket.on('message', message =>{
        io.emit('createMessage', message)
    })

    // console.log("users = " , users)
});


const PORT = process.env.PORT || 5000
// app.listen(PORT, ()=>{
//     console.log("Server is running on PORT", PORT);
// })
server.listen(PORT, () =>{
     console.log("Server is running on PORT", PORT)
})

