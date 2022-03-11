import { Client } from '@notionhq/client'
import ProjectList from '../components/ProjectList'
import React from 'react'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { setCookies } from 'cookies-next';



function Login()  {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  

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
        setCookies(e.currentTarget.value, data[i].id);
      }
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
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
  )
};

export default Login;
