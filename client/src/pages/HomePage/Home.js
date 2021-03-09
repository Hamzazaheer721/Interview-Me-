import React, {useEffect} from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection, Pricing } from '../../components';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from '../../redux/actions/authAction'

function Home() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {user, isLogged, isAdmin} = auth

  
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
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjTwo} />
      <Pricing />
      <InfoSection {...homeObjFour} />
    </>
  );
}

export default Home;
