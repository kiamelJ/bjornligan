import React from "react";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-GB"; // the locale you want
registerLocale("en-GB", en);
import Loader from "./Loader";
import style from "./../styles/Summary.module.css";

import "react-datepicker/dist/react-datepicker.css";

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
    newdata.startDate = new Intl.DateTimeFormat("sv-SV").format(data.startDate);
    newdata.endDate = new Intl.DateTimeFormat("sv-SV").format(data.endDate);

    if(!checked)
    {
      newdata.endDate = null;
    }
    

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

  if (isLoading) return <Loader />;

  if (checked) {
    if (!reports) {
      return (
        <div className={style.main}>
          <div className={style.flexbox}>
            <form className={style.projectbox}>
              <label>
                Span
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={handleChange}
                ></input>
              </label>
              <br />
              <br />
              <label htmlFor='startDate'>Start Date</label>
              <div>
                <DatePicker
                  dateFormat='yyyy-MM-dd'
                  selected={data.startDate}
                  onChange={(e) => setData({ ...data, startDate: e })}
                  required
                  locale='en-GB'
                />
              </div>
              <label htmlFor='endDate'>End Date</label>
              <div>
                <DatePicker
                  dateFormat='yyyy-MM-dd'
                  selected={data.endDate}
                  onChange={(e) => setData({ ...data, endDate: e })}
                  required
                  locale='en-GB'
                />
              </div>
              <button onClick={submitReport}>Search</button>
            </form>
          </div>
        </div>
      );
    } else if (reports) {
      console.log("report1");
      const message = !checked
        ? "Timereports for " + newdata.startDate
        : "Timereports for " + newdata.startDate + " - " + newdata.endDate;
      return (
        <div className={style.main}>
          <div className={style.flexbox}>
            <form className={style.projectbox}>
              <label>
                Span
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={handleChange}
                ></input>
              </label>
              <br />
              <br />
              <label htmlFor='startDate'>Start Date</label>
              <div>
                <DatePicker
                  dateFormat='yyyy-MM-dd'
                  selected={data.startDate}
                  onChange={(e) => setData({ ...data, startDate: e })}
                  required
                  locale='en-GB'
                />
              </div>
              <label htmlFor='endDate'>End Date</label>
              <div>
                <DatePicker
                  dateFormat='yyyy-MM-dd'
                  selected={data.endDate}
                  onChange={(e) => setData({ ...data, endDate: e })}
                  required
                  locale='en-GB'
                />
              </div>
              <button onClick={submitReport}>Search</button>
            </form>
            <p className='description'>{message}</p>
            <div className='grid'>
              {reports.map((report) => (
                <li key={report.name} className='card'>
                  <h2>
                    <strong>{report.name}</strong>
                  </h2>
                  <br />
                  Worked hours: {report.hours}
                </li>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  if (!checked) {
    if (!reports) {
      return (
        <div className={style.main}>
          <div className={style.flexbox}>
            <form className={style.projectbox}>
              <label>
                Span
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={handleChange}
                ></input>
              </label>
              <br />
              <br />
              <label htmlFor='startDate'>Date</label>
              <div>
                <DatePicker
                  dateFormat='yyyy-MM-dd'
                  selected={data.startDate}
                  onChange={(e) => setData({ ...data, startDate: e })}
                  required
                  locale='en-GB'
                />
              </div>
              <button onClick={submitReport}>Search</button>
            </form>
          </div>
        </div>
      );
    } else if (reports) {
      console.log("report2");
      const message = !checked
        ? "Timereports for " + newdata.startDate
        : "Timereports for " + newdata.startDate + " - " + newdata.endDate;
      return (
        <div className={style.main}>
          <div className={style.flexbox}>
            <form className={style.projectbox}>
              <label>
                Span
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={handleChange}
                ></input>
              </label>
              <br />
              <br />
              <div htmlFor='startDate'>Date</div>
              <div>
                <DatePicker
                  dateFormat='yyyy-MM-dd'
                  selected={data.startDate}
                  onChange={(e) => setData({ ...data, startDate: e })}
                  required
                  locale='en-GB'
                />
              </div>
              <button onClick={submitReport}>Search</button>
            </form>
            <p className='description'>{message}</p>
            <div className='grid'>
              {reports.map((report) => (
                <li key={report.name} className='card'>
                  <h2>
                    <strong>{report.name}</strong>
                  </h2>
                  <br />
                  Worked hours: {report.hours}
                </li>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
  else
    return <></>
};

export default ReportCreate;
