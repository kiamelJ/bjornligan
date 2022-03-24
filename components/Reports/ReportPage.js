import React from "react";
import { getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import Router from 'next/router'


/** props person-ID och project-ID
 * Namn?
 * */


const Reports = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  removeCookies("projectID");


  useEffect(() => {
    setLoading(true);
    fetch("../api/reports/reports")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
  }, []);

  const makeTimereport = async () => {
    //Router.push("./reports/createreport");
    
  }

  const removeTimereport = async (id) => {
      event.preventDefault();
      await fetch("../api/reports/removereport", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: id,
        })
        Router.reload(window.location.pathname);

  }
  

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return(
    <div className='container'>
      <main className='main'>
        <h1 className='title'>Tidsrapporter</h1>
        <p className='description'></p>
        <button onClick={() => { makeTimereport()}}>Ny tidsrapport</button>
        <div className='grid'>
          {data.results.map((project) => (
            <li key={project.id} className='card'>
              <div className='leftsidecard'>
              <h2>
                {project.properties.Note.title[0].plain_text}
              </h2>
              <p>{project.properties.Date.date.start} - {project.properties.Hours.number} timmar</p>
              <button onClick={() => { removeTimereport(project.id)}} disabled>Remove timereport</button>
              </div>
              <div className='rightsidecard'>
              </div>
            </li>
          ))}
        </div>
      </main>
    </div>
  )


}

// 
export default Reports;

