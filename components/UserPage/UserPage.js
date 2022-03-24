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
    fetch('../api/people/getuser')
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
                  <div className='centercard'>
                  <img src={data.specificUser.properties.Image.files[0].file.url} width="100" alt="Profilbild" className="center"></img>
                  <h2>
                    {data.specificUser.properties.Name.title[0].plain_text}
                  </h2>
                  Användarnamn: <strong>{data.specificUser.properties.Username.rich_text[0].plain_text}</strong><br/>
                  Jobbade timmar: <strong>{data.specificUser.properties["Total hours"].rollup.number}</strong><br/>
                  Antal Projekt: <strong>{data.specificUser.properties.Projects.relation.length}</strong>
                </div>
                </div>
              </div>
              <button>Byta lösenord</button>
              <button>Byta användarnamn</button>
              <button>Byta profilbild</button>
              
            
        </main >
      </div >
    </>
  )
}

export default UserPage