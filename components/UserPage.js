import React from "react";
import { useState, useEffect } from 'react';
import { getCookie } from "cookies-next";

import Loader from './Loader'

const UserPage = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('../api/people/getuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getCookie("User")),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data)
      })
  }, [])


  
  if (isLoading) return <Loader />;
  if(!data) return <h1>no data</h1>

  return (
    <div className="container">
    <main className="main">
      <h1 className="title">{data.properties.Name.title[0].plain_text}</h1>
      Användarnamn: {data.properties.Username.rich_text[0].plain_text}<br/>
      Antal projekt: {data.properties.Projects.relation.length}<br/>


    </main>
  </div>
)
};

export default UserPage;
