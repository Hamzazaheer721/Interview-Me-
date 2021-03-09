import React, { useState } from "react";
import styles from "../componentsStyles/Taketest.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function Taketest({namei, emaili}) {
  let history = useHistory();
  useEffect(()=>{

  },[namei,emaili])
  const [pin, setpin] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [res, setRes] = useState();
  const submithandler = async (e) => {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post("/user/test", { pin, emaili, namei })
      .then((res) => {
        // localStorage.setItem("name", name);
        // localStorage.setItem("email", email);
        localStorage.setItem("pin", pin);
        // console.log("good");
        setRes(res.data);
        console.log("response is :", res.data)
        history.push({
          pathname: "/test",
          state: { res: res.data },
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className={styles.parent}>
      <div className={styles.taketest}>
        <h1 className={styles.heading}>Take Test </h1>
        <br />
        <form onSubmit={submithandler}>
          <label className={styles.labels} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.inputs}
            onChange={(e) => setname(e.target.value)}
            value= {namei}
            id="name"
            name="name"
            type="text"
          />
          <br />
          <label className={styles.labels} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.inputs}
            value= {emaili}
            id="email"
            name="email"
            type="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <label className={styles.labels} htmlFor="pin">
            Pin:
          </label>
          <input
            className={styles.inputs}
            onChange={(e) => setpin(e.target.value)}
            id="pin"
            name="pin"
            type="text"
          />
          <br />
          <button type="submit" className={styles.buttons}>
            Submit
          </button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

export default Taketest;
