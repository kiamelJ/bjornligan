import { Client } from '@notionhq/client'
import ProjectList from '../components/ProjectList'
import React from 'react'
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { setCookies, removeCookies } from 'cookies-next';
import Link from 'next/link'


function Login()  {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  
  removeCookies("Björnligan");
  console.log(1);

  useEffect(() => {
    setLoading(true)
    fetch('../api/people')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  function choosePerson(e){
    console.log(e);

    for(let i = 0; i < data.length; i++)
    {
      if(data[i].name === e.currentTarget.value)
      {
        setCookies("Björnligan", data[i].id);
      }
    }

    //Används för att automatiskt gå vidare till nästa sida när en person är vald.
    Router.push("/project");
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  
  return (
    <>
    <select
      onChange={(e) => choosePerson(e)}
    >
      <option value="none" selected disabled hidden>Select user</option>
      {data.map(({ name, id }) => (
        <option key={id} value={name}>
          {name}
        </option>
      ))}
    </select>
    {/* 
      Om en knapp ska användas för att ta sig vidare.
      <Link href="/project">
      <button type="button">Välj användare</button></Link>
    */}
    </>
  )

    
  
  
  
  
};

export default Login;
