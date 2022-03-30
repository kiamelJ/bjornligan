import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import styles from './../styles/ProfilePage.module.css'
import Loader from "./Loader";

const UserPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("../api/people/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getCookie("User")),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      });
  }, []);

  if (isLoading) return <Loader />;
  if (!data) return <h1>no data</h1>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.left}>
          <img
            src={data.properties.Image.files[0].file.url}
            alt="Profile image"
          ></img>
          <h3>{data.properties.Name.title[0].plain_text}</h3>
        </div>

        <div className={styles.right}>
          <p>
            <b>Username: </b>
            {data.properties.Username.rich_text[0].plain_text}
          </p>
          <p>
            <b>Number of projects: </b>
            {data.properties.Projects.relation.length}
          </p>
        </div>
      </main>
    </div>
  );
};

// function draw() {}

export default UserPage;
