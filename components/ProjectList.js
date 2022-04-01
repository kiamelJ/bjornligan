import { useEffect, useState } from "react";
import { setCookies, getCookie } from "cookies-next";
import router from "next/router";
import Loader from '../components/Loader'

const ProjectList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("../api/people/project", {
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
        console.log(data);
      });
  }, []);

  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;

  const message =
    data.length === 0 ? "You have no active projects" : "Active projects";

  function makeTimereport(projectId) {
    console.log(projectId);
    setCookies("Project.Id", projectId);
    router.push("../timereport");
  }

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Projects</h1>
        <p className="description">{message}</p>
        <div className="grid">
          {data.map((project) => (
            <li key={project.id} id={project.id} className="card">
              <h2>{project.properties.Projectname.title[0].plain_text}</h2>
              <div className="button-container">
                <button
                  type="submit"
                  onClick={() => {
                    makeTimereport(project.id);
                  }}
                >
                  Create report
                </button>{" "}
              </div>
            </li>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectList;
