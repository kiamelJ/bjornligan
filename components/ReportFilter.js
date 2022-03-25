import React, { useEffect, useState } from "react";
import DatePicker from "react-DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Temp.module.css";

//TODO Välja projekt så vi får projektID och så vi kan skicka det till API idRequest
//TODO ProjektID state
//TODO Mappa ut resultat!

const ReportFilter = ({ project }) => {
  const [data, setData] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
    projectId: "",
  });
  const [result, setResult] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch("../api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => setResult(res))
      .then(console.log(result));
  }

  return (
    <>
      <div className='container'>
        <main className='main'>
          <h1 className='title'>Report summary</h1>
          <p className='description'>
            Se rapporterad tid per project och vecka <br />
            så jag vet hur mycket tid vi har lagt ner t.ex. senaste veckan
          </p>
          <div></div>
          <form onSubmit={handleSubmit}>
            <select>
              {project.map((project) => (
                <option
                  key={project.id}
                  id={project.id}
                  selected={data.projectId}
                  onchange={(e) => setData({ ...data, projectId: e })}
                >
                  {project.properties.Projectname.title[0].plain_text}
                </option>
              ))}
            </select>
            <label htmlFor='date'>Date From</label>
            <DatePicker
              dateFormat='yyyy-MM-dd'
              selected={data.dateFrom}
              onChange={(e) => setData({ ...data, dateFrom: e })}
              required
            />

            <label htmlFor='date'>Date to</label>
            <DatePicker
              dateFormat='yyyy-MM-dd'
              selected={data.dateTo}
              onChange={(e) => setData({ ...data, dateTo: e })}
              required
            />
            <button type='submit'>Submit</button>
          </form>
          <div className='grid'> {/* här ska det Mappas ut*/}</div>
        </main>
      </div>
    </>
  );
};

export default ReportFilter;
