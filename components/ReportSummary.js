import React from "react";
import { getCookie } from "cookies-next";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Temp.module.css";

import parseISO from 'date-fns/parseISO'
import { format, toDate } from 'date-fns'
import { makeConsoleLogger } from "@notionhq/client/build/src/logging";

const ReportCreate = () => {
  const [data, setData] = useState({
    startDate: "",
    endDate: "",
  });
  const [checked, setChecked] = useState(false);

  const [reports, setReports] = useState();
  const [isLoading, setLoading] = useState(false);


  async function submitReport(event) {
    event.preventDefault();
    console.log("input: ", data);
    setLoading(true);

    if(data.endDate != "")
    {
        data.startDate = new Intl.DateTimeFormat('sv-SV').format(data.startDate);
        data.endDate = new Intl.DateTimeFormat('sv-SV').format(data.endDate);
    }
    else
    {
        data.startDate = new Intl.DateTimeFormat('sv-SV').format(data.startDate);
    }

    console.log(data);

    await fetch("../api/timereport/reportsummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => setReports(res))
    .then(console.log(reports))
    .then(setLoading(false));
  }

  const handleChange = () => {
    setChecked(!checked);
  };

  if(checked && !reports)
  {
      return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitReport}>
      <label>Span
        <input type="checkbox" checked={checked} onChange={handleChange}></input>
        </label>
        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={data.startDate}
          onChange={(e) => setData({ ...data, startDate: e })}
          required
        />

        <label htmlFor="endDate">End Date</label>
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={data.endDate}
          onChange={(e) => setData({ ...data, endDate: e })}
          required
        />  
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  }
  else if(!checked && !reports)
  {
    return (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={submitReport}>
          <label>Span
            <input type="checkbox" checked={checked} onChange={handleChange}></input>
            </label>
            <label htmlFor="startDate">Date</label>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e })}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
  }
  else if(reports)
  {
    const message = !checked ? "Timereports for " + data.startDate : "Timereports for " + data.startDate + " - " + data.endDate;
    return (
        <div className="container">
            <main className="main">
                <h1 className="title"></h1>
                <p className="description">{message}</p>
                <div className="grid">
                {reports.map((report) => (
                    <li key={report.name} className="card">
                    <h2><strong>{report.name}</strong></h2><br/>
                    Worked hours: {report.hours}              
                    </li>
                ))}
                </div>
            </main>
        </div>
      );
  }
  
};

export default ReportCreate;
