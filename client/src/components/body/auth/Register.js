import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch, validateName, validatePassword} from '../../utils/validation/Validation'


const initialState = {
    name: '',
    email: '',
    role: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, role, password, cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
        console.log(name + value)

    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})
        if(name.length < 3){
            return setUser({...user, err: "Name must be atleast 3 characters", success: ''})
        }
        if(name.length > 12){
            return setUser({...user, err: "Name must not be greater than 12 characters", success: ''})
        }
        if(!validateName(name))
            return setUser({...user, err: "Name can be alphanumeric only", success: ''})
       
        if(!isEmail(email))
            return setUser({...user, err: "Invalid email!", success: ''})
        
        if(password.length < 3){
            return setUser({...user, err: "Password must be atleast 3 characters", success: ''})
        }
        if(password.length > 12){
            return setUser({...user, err: "Password must not be greater than 12 characters", success: ''})
        }
        
        if(!validatePassword(password))
            return setUser({...user, err: "Password should have atleast 1 ASCII character, digit, lower letter and Upper letter", success: ''})

        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password, role
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
        console.log(user)
    }

    return (
        <div className="login_page">
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter your name" id="name"
                    value={name} name="name" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div className= "roles">
                    <label htmlFor="role"> Role</label>
                    <div className ="roles__inputContainer">

                        <div className="left__input">
                            <input  type="radio" checked id= "candidate" value= {0} name= "role" onChange={handleChangeInput} />
                            Candidate
                        </div>

                        <div className="right__input">
                            <input  type="radio" id= "interviewer" value= {1} name= "role" onChange={handleChangeInput} />
                            Interviewer
                        </div>
                        
                    </div>
                    
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" id="cf_password"
                    value={cf_password} name="cf_password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
