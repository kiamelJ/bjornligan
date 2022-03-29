import React from "react";

const ReportResult = ({ reports }) => {
  const message = reports.length === 0 ? "Inga rapporter att visa" : "";
  return (
    <>
      <p>{message}</p>
      {reports.map((report) => (
        <li key={report.id}>{report.properties.Hours.number}</li>
      ))}
    </>
  );
};

export default ReportResult;
