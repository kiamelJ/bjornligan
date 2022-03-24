import React from "react";
import Router from "next/router";
import { useState, useEffect } from "react";
import { setCookies, removeCookies } from "cookies-next";

import styles from "../styles/Temp.module.css";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  async function LoginUser(event) {
    event.preventDefault();

    await fetch("../api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((result) => {
        console.log(result);
        setCookies("User", result.results[0].id);
        Router.push("./project");
      })
      .catch((error) => {
        console.log("Something went wrong.", error);
        alert("Invalid credentials. Please try again.");
      });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={LoginUser}>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter username..."
              //TODO: Fixa regex
              // pattern='([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))'
              // title='(YYYY-MM-DD)'
              value={data.username}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
        </div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password..."
          value={data.password}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
