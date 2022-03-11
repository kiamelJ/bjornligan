import react from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import FormTimeReport from "../timereport";

const ProjectList = ({ projects }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("../api/project")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className='container'>
      <main className='main'>
        <h1 className='title'>Aktiva Projekt</h1>
        <p className='description'>Information</p>
        <div className='grid'>
          {data.results.map((project) => (
            <li key={project.id} className='card'>
              <h2>
                {project.properties.Projectname.title[0].plain_text} &rarr;
              </h2>
              <p>projektinfo</p>
              <Link href='../timereport'>
                <a>
                  <button>Ny tidrapport</button>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectList;
