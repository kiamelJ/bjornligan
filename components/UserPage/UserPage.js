import React from 'react'
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { getCookie, removeCookies } from 'cookies-next';
import Link from 'next/link'

const UserPage = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    fetch('../api/people/getuser', {
      method: "POST",
      headers: {
        "Content-Type": "plain/text",
      },
      body: getCookie("token"),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data)
      })
  }, [])

  
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  if(data.msg == "bad cookie"){ Router.push('/logout'); return(<></>) }

  console.log("data: ", data);

  return (
    <>
      <div className='container'>
        <main className='main'>
          <div className='grid'>
                <div className='card'>
                  <img src={data.specificUser.properties.Image.files[0].file.url} width="100" alt="Profilbild" className="center"></img>
                  <h2>
                    {data.specificUser.properties.Name.title[0].plain_text}
                  </h2>
                  Jobbade timmar: {data.specificUser.properties["Total hours"].rollup.number}
                </div>
                <button>Byta lösenord</button>
                <button>Byta användarnamn</button>
              </div>
              
            
        </main >
      </div >
    </>
  )
}

export default UserPage