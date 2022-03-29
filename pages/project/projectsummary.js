import React from "react";
import Layout from "../../components/Layout";
import ProjectSummary from "../../components/ProjectSummary";
import Meta from "../../components/Meta";


const report = ({ project }) => {
  return (
    <>
      <Layout>
      <Meta title='Project Summary' keywords='users, time, date, project' description='Total worked hours for a specific project at a specific date/period' />
      <ProjectSummary project={project} />
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
    const res = await fetch("http://localhost:3000/api/project");
    const response = await res.json();
    return {
      props: {
        project: response.results,
      },
    };
};

  
export default report;