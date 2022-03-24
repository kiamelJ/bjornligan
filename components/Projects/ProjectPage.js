import react from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import FormTimeReport from "../Reports/ReportPage";
import { setCookies, getCookie, checkCookies } from "cookies-next";
import router from "next/router";




const ProjectList = ({ projects }) => {
  const [data, setData] = useState(null);
  const [correctData, setCorrectData] = useState(false);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetch("../api/project/userprojects")
    .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  if(data.msg == "bad cookie"){ router.push('/logout'); return(<></>) }


  function makeTimereport(projectID){
    //console.log(projectId)
    //setCookies("projectID",projectId)
    router.push({pathname: "../reports/createreport", query: {id: projectID}});
  }

  function MoreInfo(projectID){


    router.push({pathname: "../projects/specificproject", query: {id: projectID}});
  }

  return (
    <div className='container'>
      <main className='main'>
        <h1 className='title'>Aktiva Projekt</h1>
        <p className='description'></p>
        <div className='grid'>
          {data.map((project) => (
            <li key={project.id} id={project.id} className='card'>
              <div className='leftsidecard'>
              <h2>
                {project.properties.Projectname.title[0].plain_text}
              </h2>
              <p>{project.properties.Status.select.name}</p>
              <button type="submit" onClick={() => { makeTimereport(project.id) }}>Ny tidrapport</button>
              <button type="submit" onClick={() => {MoreInfo(project.id)}}>Mer information</button>
              </div>
              <div className='rightsidecard'>
                {project.properties.Timespan.date.start} - {project.properties.Timespan.date.end}<br/>
                Timmar: {project.properties.Hours.number}<br/>
                Timmar kvar: {project.properties["Hours left"].formula.number}<br/>
                Timmar arbetade: {project.properties["Worked hours"].rollup.number}
              </div>
            </li>
          ))}
        </div>
      </main>
    </div>
  );
};


export default ProjectList;

