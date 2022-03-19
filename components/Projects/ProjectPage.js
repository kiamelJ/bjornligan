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
    fetch("../api/project/userprojects", {
      method: "POST",
      headers: {
        "Content-Type": "plain/text",
      },
      body: getCookie("token"),
    })
    .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  if(data.msg == "bad cookie"){ router.push('/logout'); return(<></>) }

  function makeTimereport(projectId){
    //console.log(projectId)
    setCookies("projectID",projectId)
    router.push("../reports/createreport");
  }
  //console.log(data);

  return (
    <div className='container'>
      <main className='main'>
        <h1 className='title'>Aktiva Projekt</h1>
        <p className='description'></p>
        <div className='grid'>
          {data.map((project) => (
            <li key={project.id} id={project.id} className='card'>
              <h2>
                {project.properties.Projectname.title[0].plain_text}
              </h2>
              <p>{project.properties.Status.select.name}</p>
              <button type="submit" onClick={() => { makeTimereport(project.id) }}>Ny tidrapport</button>
            </li>
          ))}
        </div>
      </main>
    </div>
  );
};


export default ProjectList;

