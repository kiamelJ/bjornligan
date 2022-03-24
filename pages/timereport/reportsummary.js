import React from "react";
import { getCookie } from "cookies-next";
import styles from "../../styles/Temp.module.css";

import ReportList from "../../components/ReportList";
import ReportSummaryComponent from "../../components/ReportSummary";
import Layout from "../../components/Layout";

const ReportSummary = () => {
  return (
    <>
      <Layout>
        <ReportSummaryComponent />
      </Layout>
    </>
  );
};


export default ReportSummary;
