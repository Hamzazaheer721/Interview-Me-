import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser, dispatchMakeVisible, dispatchMakeInvisible, dispatchToggleVisible} from './redux/actions/authAction'
import { useHistory } from "react-router-dom";

import { InfoSection, Pricing } from './components';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour, homeObjFive } from './pages/HomePage/Data';
import Header from './components/header/Header'
import axios from 'axios';
import Login from './components/body/auth/Login';
import Register from './components/body/auth/Register';
import ForgotPassword from './components/body/auth/ForgotPassword';
import ResetPassword from './components/body/auth/ResetPassword';
import ActivationEmail from './components/body/auth/ActivationEmail';
import NotFound from './components/utils/NotFound/NotFound';
import Call from './components/Call';
import HomeOld from './components/body/home/Home';
import Profile from './components/body/profile/Profile';
import EditUser from './components/body/profile/EditUser';


import Testresult from "./components/TestResult.component";
import Questions from "./components/Question.component";
import Taketest from "./components/TakeTest.component";
import Dashboard from './components/Dashboard.component'


import GlobalStyle from './globalStyles';
import HomeLanding from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import SignUp from './pages/SignUp/SignUp';
import ScrollToTop from './components/ScrollToTop';
import { Navbar, Footer } from './components';

import Team from './pages/Team';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Overview from './pages/Overview';
import Sidebar from './components/Sidebar';


function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {user, isLogged, isAdmin} = auth
  let history = useHistory();
  
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
    // console.log("user: ", auth)
  },[auth?.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())
        return fetchUser(token).then(res => {
          // console.log("user is being sent here", res);
          try{
            dispatch(dispatchGetUser(res))          
          }
          catch(e) {
            console.log(res, e)
          }
        })
      }
      getUser()
    }
  },[token, auth.user, dispatch])


  return (
    
    <>
    <Router>
      <GlobalStyle />
      <ScrollToTop />
         <div className="App">
         <Switch>
              <Route path = "/login">
                <Navbar />  
                <Login />
                <Footer />
               </Route>

              <Route path = "/register">  
                <Navbar /> 
                {isLogged ? <NotFound /> : <Register />}
                <Footer />
              </Route>

              <Route path = "/forgot_password">
                <Navbar />  
                {isLogged ? <NotFound /> : <ForgotPassword />}
                <Footer />
              </Route>

              <Route path = "/user/reset/:token">
                <Navbar />    
                {isLogged ? <NotFound /> : <ResetPassword />}
                <Footer />
              </Route>
         
              <Route path = "/user/activate/:activation_token">   
               <Navbar />
               <ActivationEmail />
               <Footer />  
              </Route>

              <Route path = "/profile">   
                <Navbar /> 
                {isLogged ? <Profile /> : <NotFound />}
                <Footer />
              </Route>

              <Route path = "/edit_user/:id">   
                <Navbar />
                {isAdmin ? <EditUser /> : <NotFound />}
                <Footer />
              </Route>

              <Route path = "/call">   
                < Call />
              </Route>

              <Route path = "/dashboard">
                <Navbar />   
                {isAdmin ? <Dashboard user = {auth.user} role = {auth.isAdmin}/> : <NotFound />}
                <Footer />    
              </Route>

              <Route exact path = "/abouttest">
                <Navbar />
                {isAdmin ? <Testresult user = {auth.user} role = {auth.isAdmin} /> : <NotFound />}    
                
              </Route>

              {/* <Route exact path="/abouttest" component={Testresult} /> */}
              
              <Route path = "/test">   
                <Questions user = {auth.user} role = {auth.isAdmin}/>
              </Route>

              <Route path = "/taketest">
                <Navbar />
                {isLogged ? <Taketest namei = {auth?.user?.name} emaili = {auth?.user?.email}/> : <NotFound />}
                
              </Route>

              <Route path = "/home">
                <Navbar />      
                <HomeLanding />
                <Footer />
              </Route>

              <Route path = "/services">
                <Navbar />      
                <Services />
                <Footer />
              </Route>

              <Route path = "/products">
                <Navbar />    
                <Products />
                <Footer />
              </Route>

              <Route path = "/sign-up">
                <Navbar />   
                <SignUp />
                <Footer />
              </Route>

              <Route path = "/main-menu">
                <Navbar />
                <Sidebar user = {auth.user} role = {auth.isAdmin}/>
                 
                {/* <HomeLanding />   */}
                {/* {isLogged ? <HomeOld user = {auth.user} role = {auth.isAdmin}/> : <NotFound />} */}
                {isLogged ? <InfoSection {...homeObjFive}/> : <NotFound />}
              </Route>
              
              <Route path = "/overview">
                <Navbar />   
                <Overview />
                <Footer />
              </Route>

              <Route path = "/reports">
                <Navbar />   
                <Reports />
                <Footer />
              </Route>

              <Route path = "/reports/reports1">
                <Navbar />   
                <ReportsOne />
                <Footer />
              </Route>

              <Route path = "/reports/reports2">
                <Navbar />   
                <ReportsTwo />
                <Footer />
              </Route>

              <Route path = "/reports/reports3">
                <Navbar />   
                <ReportsThree />
                <Footer />
              </Route>

              <Route path = "/team">
                <Navbar />   
                <Team />
                <Footer />
              </Route>



              <Route exact path = "/">   
                <Navbar />
                <HomeLanding />
                <Footer />
              </Route>

           </Switch>
         </div>
      </Router>  
    </>   
    
  );
}

export default App;