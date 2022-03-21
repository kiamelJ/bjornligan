import React from "react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import styles from '../styles/Temp.module.css'

/** props person-ID och project-ID
 * Namn?
 * */

const ReportList = ({report}) => {

    return (
        <div className='container'>
          <main className='main'>
            <h1 className='title'>Aktiva Projekt</h1>
            <p className='description'></p>
            <div className='grid'>
              {report.response.results.map((data) => (
                <li key={data.id} id={data.id} className='card'>
                  <h2>
                    {data.properties.Note.title[0].plain_text}
                  </h2>
                    {}
                </li>
              ))}
            </div>
          </main>
        </div>
      );

}

export default ReportList;
