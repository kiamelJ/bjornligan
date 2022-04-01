import React from "react";
import ReportCreate from "../../components/ReportCreate";
import Layout from "../../components/Layout";
import Meta from "../../components/Meta";

const Timereport = ({ report }) => {
  return (
    <>
      <Layout>
        <Meta title='Create report' keywords='create, report, time' description='Create a time report' />
        <ReportCreate />
      </Layout>
    </>
  );
};

export default Timereport;
