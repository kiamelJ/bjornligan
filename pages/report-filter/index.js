import React from "react";
import Layout from "../../components/Layout";
import ReportFilter from "../../components/ReportFilter";
const report = ({ project }) => {
  return (
    <>
      <Layout>
        <ReportFilter project={project} />
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
