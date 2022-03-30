import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-GB"; // the locale you want
registerLocale("en-GB", en);
import "react-datepicker/dist/react-datepicker.css";
import style from "./../styles/Summary.module.css";
import Loader from "./Loader";

//TODO Välja projekt så vi får projektID och så vi kan skicka det till API idRequest
//TODO ProjektID state
//TODO Mappa ut resultat!

const ProjectSummary = ({ project }) => {
  const [data, setData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    projectId: "",
  });

  const [newData, setNewData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    projectId: "",
  });

  const [isLoading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("input: ", data);
    setLoading(true);

    newData.startDate = new Intl.DateTimeFormat("sv-SV").format(data.startDate);
    newData.endDate = new Intl.DateTimeFormat("sv-SV").format(data.endDate);
    newData.projectId = data.projectId;

    console.log("out data: ", newData);

    await fetch("../api/project/projectsummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
        setLoading(false);
      });
  }

  if (isLoading == true) {
    return <Loader />;
  } else if (isLoading == false && result == null) {
    return (
      <div className={style.main}>
        <div className={style.flexbox}>
          <form className={style.projectbox} onSubmit={handleSubmit}>
            <label htmlFor='project'></label>
            <select
              value={data.projectId}
              onChange={(e) => setData({ ...data, projectId: e.target.value })}
              required
            >
              <option value='' disabled hidden>
                Choose Project...
              </option>
              {project.map((project) => (
                <option
                  key={project.id}
                  id={project.id}
                  value={project.id}
                  // selected={data.projectId}
                >
                  {project.properties.Projectname.title[0].plain_text}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label htmlFor='startDate'>Start Date</label>
            <DatePicker
              dateFormat='yyyy-MM-dd'
              selected={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e })}
              required
              locale='en-GB'
            />
            <div htmlFor='endDate'>End Date</div>
            <DatePicker
              dateFormat='yyyy-MM-dd'
              selected={data.endDate}
              onChange={(e) => setData({ ...data, endDate: e })}
              required
              locale='en-GB'
            />
            <button type='submit'>Search</button>
          </form>
        </div>
      </div>
    );
  } else if (isLoading == false && result != null) {
    console.log("report1");
    const message =
      "Timereports for " + newData.startDate + " - " + newData.endDate;
    return (
      <div className={style.main}>
        <div className={style.flexbox}>
          <form className={style.projectbox} onSubmit={handleSubmit}>
            <div htmlFor='project'></div>
            <select
              value={data.projectId}
              onChange={(e) => setData({ ...data, projectId: e.target.value })}
              required
            >
              <option value='' disabled hidden>
                Please Choose...
              </option>
              {project.map((project) => (
                <option
                  key={project.id}
                  id={project.id}
                  value={project.id}
                  // selected={data.projectId}
                >
                  {project.properties.Projectname.title[0].plain_text}
                </option>
              ))}
            </select>
            <br />
            <br />
            <div htmlFor='startDate'>Start Date</div>
            <DatePicker
              dateFormat='yyyy-MM-dd'
              selected={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e })}
              required
              locale='en-GB'
            />
            <div htmlFor='endDate'>End Date</div>
            <DatePicker
              dateFormat='yyyy-MM-dd'
              selected={data.endDate}
              onChange={(e) => setData({ ...data, endDate: e })}
              required
              locale='en-GB'
            />
            <button type='submit'>Search</button>
          </form>

          <p className='description'>{message}</p>
          <div className='grid'>
            Total hours for this project:&nbsp;<strong> {result}</strong>
          </div>
        </div>
      </div>
    );
  }
};

export default ProjectSummary;
