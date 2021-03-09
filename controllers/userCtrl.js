const Users = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const fetch = require('node-fetch')
const test = require("../models/test.model");
const result = require("../models/result.model");
const axios = require("axios");
const sendMail = require('./sendMail');
const sendEmail = require('./sendMail');

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)
const {CLIENT_URL, ACTIVATION_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;
const userCtrl = {
    register: async (req, res) =>{
        
        try{
            const { name, email, password, role } = req.body;
            console.log(role + "is the role")
            if (!name || !email || !password){
                return res.status(400).json({msg : "Please fill in all fields"})
            }
            if(name.length < 3){
                return res.status(400).json({msg : "Name must be atleast 3 characters"})
            }
            if(name.length > 12){
                return res.status(400).json({msg : "Name must not be greater than 12 characters"})
            }
            if(!validateName(name)){
                return res.status(400).json({msg : "Name can be alphanumeric only"})
            }    

            if(!validateEmail(email)){
                return res.status(400).json({msg : "Invalid Email"})
            }
            
            const user = await Users.findOne({email});
            if(user) return res.status(400).json({msg : "This email has already been registered"})
            
            if(password.length < 6){
                return res.status(400).json({msg : "Password must be atleast 6 characters"})
            }
            if(password.length > 12){
                return res.status(400).json({msg : "Password must not be greater than 12 characters"})
            }
            if(!validatePassword(password)){
                return res.status(400).json({msg : "Password should have atleast 1 ASCII character, digit, lower letter and Upper letter"})
            }
            const passwordHash = await bcrypt.hash(password, 12);
            // console.log({password, passwordHash});
            // console.log(req.body);
            const newUser = {
                name, email, role, password: passwordHash
            }
            
            console.log(newUser);
            
            const activation_token = createActivationToken(newUser)
            // console.log({activation_token});
            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify Your Email Address")

            res.json({msg : "Register Success! Please activate your email to start"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail:  async (req, res) => {
        try {
            const {activation_token} = req.body;
            const user = jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET)
            // console.log({ACTIVATION_TOKEN_SECRET});
            // console.log({activation_token}); 
            // console.log(user); // if we copypaste the activation code from email ahead of activate/ then send req by postman here we will get to see user
            
            const {name, email, password, role} = user;
            const check = await Users.findOne({email});
            if(check) return res.status(400).json({msg : "This email has already been registered"})

            const newUser = new Users({
                name, email, password, role
            })
            await newUser.save()
            
            res.json({msg : "Account has been activated"})

        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;
            if(!password || !email){
                return res.status(400).json({msg : "Please fill all the fields"})
            }
            const user = await Users.findOne({email});
            if(!user) return res.status(400).json({msg : "This email doesn't exist"})

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({msg : "Password is incorrect"})
            
            
            // console.log(user);

            //following code will refresh the cookie for 7 days after respective login
            //send the POST req to Login then Get request to path in cookie with postman
            //goto cookies option to see it wok
            //check expiry date to see the magic  
            const refresh_token = createRefreshToken({id: user._id});
            res.cookie("refreshtoken", refresh_token ,{
                httpOnly: true,
                path: "/user/refresh_token",
                maxAge: 7*24*60*60*100 //7days
            });

            res.json({msg : "You logged In"})
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
    getAccessToken: async (req,res) => {
        try {
            //here refreshtoken is not varaible but the name which we gave to cookie while creating it in login part
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})
            jwt.verify(rf_token, REFRESH_TOKEN_SECRET, (err,user)=>{
                if(err) return res.status(400).json({msg : "Please login now!"})
                //console.log(user); //user is recognized here by its id = user._id
                const access_token = createAccessToken({id: user.id})
                res.json({access_token}) //this token is same as the one which was sent to the email containing user information
                
            })
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
    forgotPassword: async (req, res) =>{
        try {
            const {email} = req.body;
            const user = await Users.findOne({email});
            if(!user) return res.status(400).json({msg : "This email doesn't exist"})
            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`
            sendEmail(email,url,"Reset Your password");
            res.json({msg : "To reset your password, Please check your email"});
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
    resetPassword: async (req,res) =>{
        try {
            const {password} = req.body;
            // if(!password){
            //     return res.status(400).json({msg : "Please fill all the fields"})
            // }
            // if(password.length < 6){
            //     return res.status(400).json({msg : "Password must be atleast 6 characters"})
            // }
            // if(password.length > 12){
            //     return res.status(400).json({msg : "Password must not be greater than 12 characters"})
            // }
            // if(!validatePassword(password)){
            //     return res.status(400).json({msg : "Password should have atleast 1 ASCII character, digit, lower letter and Upper letter"})
            // }

            const passwordHash = await bcrypt.hash(password, 12);
            // console.log(req.user);
            await Users.findOneAndUpdate({_id: req.user.id},{
                password: passwordHash
            })
            return res.json({msg : "Password changed successfully"})
        } catch (error) {
             return res.status(500).json({msg : error.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
             const users = await Users.findById(req.user.id).select('-password')
             res.json(users);
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            // if user role comes then admin access will be denied from middleware
            // if admin with role : 1 comes then middleware will display req.user information
            // change it from db atlas and send req to infor and then to all_infor and see req.user here
            // console.log(req.user);
            const users = await Users.find().select('-password')
            res.json(users)
        } catch (error ) {
            return res.status(500).json({msg: error.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path : '/user/refresh_token'})
            return res.json({msg: "Logged Out."})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {name, avatar} = req.body;
            await Users.findByIdAndUpdate({_id : req.user.id},{
                name, avatar
            })
            res.json({msg: "Update Successful!"})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            console.log(req.user); // this will print user which is stored in header authorization
            const {role} = req.body;
            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })
            res.json({msg : "Role Updated Successfully!"}) 
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser : async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)
            res.json({msg : "User Deleted Successfully!"}) 
        } catch (error) {
            return res.status(500).json({msg: err.message})
        } 
    },
    googleLogin: async (req, res) => {
        try {
            const {tokenId} = req.body
            console.log("heyy",tokenId)
            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})        
            const {email_verified, email, name, picture} = verify.payload
            const password = email + process.env.GOOGLE_SECRET
            const passwordHash = await bcrypt.hash(password, 12)
            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})
            const user = await Users.findOne({email})
            if(user){
                // const isMatch = await bcrypt.compare(password, user.password)
                // if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })
                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture
                })
                await newUser.save()        
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })
                res.json({msg: "Login success!"})
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
            console.log(err)
        }
    },
    facebookLogin: async (req, res) => {
        try {
            const {accessToken, userID} = req.body
            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`         
            const data = await fetch(URL).then(res => res.json()).then(res => {return res})
            const {email, name, picture} = data
            const password = email + process.env.FACEBOOK_SECRET
            const passwordHash = await bcrypt.hash(password, 12)
            const user = await Users.findOne({email})
            if(user){
                // const isMatch = await bcrypt.compare(password, user.password)
                // if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })
                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture.data.url
                })
                await newUser.save()     
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })
                res.json({msg: "Login success!"})
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addtest: async (req, res) => {
        try {
            // console.log(req.body)
            const pin = (await test.countDocuments({}).exec()) + 1000;
            //   const pin = req.body.pin;
            //   const email = req.user.email.toLowerCase();
            const email = req.body.email;
            const amount = req.body.amount;
            const topic = req.body.topic;
            const time = req.body.time;
            const expiry = Date.parse(req.body.expiry);
            const created = Date.parse(req.body.created);
        
            const newtest = new test({
            pin,
            email,
            amount,
            topic,
            time,
            expiry,
            created,
            });
            console.log(newtest, " is test")
            newtest
            .save()
            .then(() => res.send("test added!"))
            .catch((err) => res.status(400).json("error : " + err));
            res.json({msg: "test success!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    gettest: async (req, res) => {
        try {
            const email = req.body.email;
            console.log("heyyy ",email)
            const doc = await test.find({ email }).sort("-created").exec();
            return res.send(doc);

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getresults: async (req, res) =>{
        try {
            const pin = req.body.pin;
            const resultdoc = await result.find({ pin }).exec();
            return res.send(resultdoc);
        } catch (err) {
            return res.status(400).send();
        }
    },
    testapi: async (req, res) =>{
        console.log("The body is ", req.body)
        const testid = req.body.pin;
        const email = req.body.emaili;
        console.log("email is ", email)
        const doc = await test.findOne({ pin: testid }).exec();
        if (!doc) {
          return res.status(400).send({ message: "Test doesn't exist!" });
        }
        if (Date.parse(doc.expiry) < Date.now()) {
          return res.status(400).send({ message: "Test has expired!! " });
        }
        const check = await result.findOne({ pin: testid, email }).exec();
        if (check) {
          return res.status(400).send({ message: "Test already taken!" });
        }
        const questions = await axios.get("https://opentdb.com/api.php", {
          params: {
            amount: doc.amount,
            category: doc.topic,
          },
        });
        questions.data.time = doc.time;
        if (questions.data.response_code == 0) {
            return res.send(questions.data);
        }
        
        else
          return res
            .status(400)
            .send({ message: "Couldn't fetch test details. Try again!" });
    },
    submittest: async (req, res) =>{
        const score = parseInt(req.body.score);
        const email = req.body.email;
        const name = req.body.name;
        const pin = req.body.pin;
      
        const resultEntry = new result({ email, name, pin, score });
        console.log(resultEntry)
        resultEntry
          .save()
          .then(() => {
              console.log("yo result has been added")
              res.send("result added!")
            })
          .catch((err) => {
              console.log("error arose:", err)
              res.status(400).json("error : " + err)});       
    }
}
function validatePassword(pass) {
    const re = /^(?=(.*\d){1})(?=(.*[A-Z]){1})(?=(.*[a-z]){1})(?=(.*[!@#$%]){1})[0-9a-zA-Z!@#$%]{6,12}$/;
    return re.test(pass);
}

function validateName(name) {
    const re = /^[a-zA-Z0-9]{3,12}$/;
    return re.test(name);
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payLoad) => {
    return jwt.sign(payLoad, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: "5m"})
}

const createAccessToken = (payLoad) => {
    return jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "7m"})
}

const createRefreshToken = (payLoad) => {
    return jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
}

module.exports = userCtrl;