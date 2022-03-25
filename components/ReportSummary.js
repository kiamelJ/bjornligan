import React from "react";
import { getCookie } from "cookies-next";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import Loader from "./Loader"

import "react-datepicker/dist/react-datepicker.css";

import { isoParse } from 'date-fns'

const ReportCreate = () => {
  const [data, setData] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [newdata, setnewData] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  
  const [checked, setChecked] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [reports, setReports] = useState(null);




  async function submitReport(event) {
    event.preventDefault();
    console.log(!Number.isNaN(new Date(data.startDate).getTime()));
    setLoading(true);
    newdata.startDate = new Intl.DateTimeFormat('sv-SV').format(data.startDate);
    newdata.endDate = new Intl.DateTimeFormat('sv-SV').format(data.endDate);

    await fetch("../api/timereport/reportsummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
    })
    .then((res) => res.json())
      .then((data) => {
        setReports(data);
        console.log(data);
        setLoading(false);
      });
  }

  const handleChange = () => {
    setChecked(!checked);
    data.startDate = new Date();
    data.endDate = new Date();
    setReports(null);
  };

  if(isLoading) return <Loader />;
  
  if(checked)
  {
    if(!reports)
    {
      return (
        <>
        <label>Span
          <input type="checkbox" checked={checked} onChange={handleChange}></input>
          </label>
          
          <br/>
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
          <button onClick={submitReport}>Submit</button>
          </>
    );
    }
    else if(reports)
    {
      
      console.log("report1");
      const message = !checked ? "Timereports for " + newdata.startDate : "Timereports for " + newdata.startDate + " - " + newdata.endDate;
      return(
        <>
          <label>Span
          <input type="checkbox" checked={checked} onChange={handleChange}></input>
          </label>
          
          <br/>
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
          <button onClick={submitReport}>Submit</button>
       
        <p className="description">{message}</p>
        <div className="grid">
        {reports.map((report) => (
            <li key={report.name} className="card">
            <h2><strong>{report.name}</strong></h2><br/>
            Worked hours: {report.hours}              
            </li>
        ))}
        </div>
        </>
      )
    }
  }

  if(!checked)
  {
    if(!reports)
    {
      return (
        <>
                <label>Span
          <input type="checkbox" checked={checked} onChange={handleChange}></input>
          </label>
          
          <br/>
          <label htmlFor="startDate">Date</label>
          <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={data.startDate}
          onChange={(e) => setData({ ...data, startDate: e })}
          required
        />
          <button onClick={submitReport}>Submit</button>
          </>

    );
    }
    
    else if(reports)
    {
      console.log("report2");
      const message = !checked ? "Timereports for " + newdata.startDate : "Timereports for " + newdata.startDate + " - " + newdata.endDate;
      return(
        <>
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
          <button onClick={submitReport}>Submit</button>
        <p className="description">{message}</p>
        <div className="grid">
        {reports.map((report) => (
            <li key={report.name} className="card">
            <h2><strong>{report.name}</strong></h2><br/>
            Worked hours: {report.hours}              
            </li>
        ))}
        </div>
        </>
      )
    }
    
  }
  
};

export default ReportCreate;
