import React from "react";
import { getCookie } from "cookies-next";
import styles from "../../styles/Temp.module.css";

import ReportList from "../../components/ReportList";
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
      {/* <ReportList report={report}/> */}
    </>
  );
};

//  export const getServerSideProps = async() => {
//   const res = await fetch('http://localhost:3000/api/timereport');
//   const response = await res.json();

//   return{
//     props: {
//       report: response,
//     }
//   }

// }

export default Timereport;
