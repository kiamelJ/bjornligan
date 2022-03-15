import react from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import FormTimeReport from "../timereport";
import { setCookies, getCookie } from "cookies-next";
import router from "next/router";

const ProjectList = ({ projects }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetch("../api/people", {
      method: "POST",
      headers: {
        "Content-Type": "plain/text",
      },
      body: getCookie("User"),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        //console.log(data);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  function makeTimereport(projectId){
    
    console.log(projectId)
    setCookies("Project.Id",projectId)
    router.push("../timereport");
  }

  return (
    <div className='container'>
      <main className='main'>
        <h1 className='title'>Aktiva Projekt</h1>
        <p className='description'>Information</p>
        <div className='grid'>
          {data.map((project) => (
            <li key={project.id} id={project.id} className='card'>
              <h2>
                {project.properties.Projectname.title[0].plain_text} &rarr;
              </h2>
              <p>projektinfo</p>
              {/* <button onClick={makeTimereport(project.id)}>Ny tidrapport</button> */}
              <button type="submit" onClick={() => {makeTimereport(project.id)}}>Ny tidrapport</button>
              {/* <Link href='../timereport'>
                <a>
                  <button onClick={makeTimereport(project.id)}>Ny tidrapport</button>
                </a>
              </Link> */}
            </li>
          ))}
        </div>
      </main>
    </div>
  );
};
// const makeTimereport=function(projectId){
//   console.log(projectId)
//   setCookies("Project.Id",projectId)

// }

export default ProjectList;
