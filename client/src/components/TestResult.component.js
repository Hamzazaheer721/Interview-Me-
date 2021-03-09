import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import teststyles from "../componentsStyles/Testelement.module.css";
import axios from "axios";
import Resultelement from "./ResultElement.component";
import styles from "../componentsStyles/Dashboard.module.css";
import resultstyles from "../componentsStyles/TestResult.module.css";
import {useLocation} from 'react-router-dom'

function Testresult(props) {
  let history = useHistory();
  
  const location = useLocation() 
  // if you dont use above line then you will have to use 
  // {/* <Route exact path="/abouttest" component={Testresult} /> */}
  // in App.js 
  // and replace all occurences of location.state. to props.location.state.

  const [result, setresult] = useState([]);
  let expiry = new Date(location.state.expiry);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("firstlogin"),
      },
    };
    axios
      .post("/user/getresults", { pin: location.state.pin }, options)
      .then((res) => setresult(res.data))
      .catch((err) => {
        console.log(err);
        alert("Couldn't Fetch!");
        history.push("/dashboard");
      });
  }, [props?.user]);
  return (
    <Fragment>
      <div>
        <h1
          className={teststyles.heading}
          style={{ background: "white", fontSize: "2em", padding: "2%" }}
        >
          Welcome {props.user?.name}
        </h1>
      </div>
      <button
        className={styles.buttons}
        style={{ float: "left", display: "block" }}
        onClick={() => history.goBack()}
      >
        &lt;- Back
      </button>
      <br />
      <br />
      <br />
      <br />
      <div className={teststyles.container}>
        <div className={resultstyles.info}>
          <h1 style={{ textAlign: "center" }}> About Test</h1>
          <strong>Pin: </strong> {location.state.pin}
          <br />
          <strong>Topic: </strong> {location.state.topicname}
          <br />
          <strong>No. of Ques: </strong> {location.state.amount}
          <br />
          <strong>Time Duration: </strong> {location.state.time} <br />
          <strong>Expiry: </strong> {expiry.getDate()}-{expiry.getMonth()}-
          {expiry.getFullYear()}
          <br />
        </div>
        <div className={resultstyles.parent}>
          <div className={resultstyles.resultrow}>
            <div className={teststyles.element}>
              <strong>Name</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Email</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Score</strong>
            </div>
          </div>
          {result.length === 0 ? (
            <div className={resultstyles.resultrow}>
              <div
                className={teststyles.element}
                style={{ gridColumnStart: "2" }}
              >
                No result found!
              </div>
            </div>
          ) : (
            result.map((obj) => <Resultelement key={obj._id} {...obj} />)
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Testresult;
