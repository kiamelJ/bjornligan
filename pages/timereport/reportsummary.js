import React from "react";
import ReportSummaryComponent from "../../components/ReportSummary";
import Layout from "../../components/Layout";
import Meta from "../../components/Meta";

const ReportSummary = () => {
  return (
    <>
      <Layout>
      <Meta title='Report Summary' keywords='user, time, date' description='Worked hours for each employee at a specific date/period' />
      <ReportSummaryComponent />
      </Layout>
    </>
  );
};


export default ReportSummary;