import React from 'react'
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { setCookies, removeCookies } from 'cookies-next';

function Login() {
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

  function choosePerson(e, name) {
    console.log(e);

    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) {
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
      <div className='container'>
        <main className='main'>
          <h1 className='title'>Välj användare för att logga in </h1>
          <p className='description'></p>
          <div className='grid'>
            {data.map(({ name, id, image }) => (
              <div onClick={(e) => choosePerson(e, name)}>
                <div key={id} value={name} className='card'>
                  <img src={image} width="100" alt="Profilbild" className="center"></img>
                  <h2>
                    {name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </main >
      </div >
    </>
  )
};

export default Login;
