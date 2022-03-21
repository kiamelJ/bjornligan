import React from "react";
import { getCookie, getCookies } from "cookies-next";
import { useEffect, useState } from "react";
import styles from '../styles/Temp.module.css'

/** props person-ID och project-ID
 * Namn?
 * */

const ReportCreate = () => {
    // const [data, setData] = useState({
    //   note: "",
    //   date: "",
    //   hours: 0,
    //   person: getCookies("Björnligan"),
    //   project: getCookie("Project.Id")
    // });

    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState(0);
    const person = getCookies("Björnligan");
    const project = getCookie("Project.Id");

    
    
    
    async function submitReport(){

      console.log(note, date, hour, person, project);

      await fetch("../api/timereport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: note, date, hour, person, project,
      });
    }

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitReport}>
          <div className={styles.inputs}>
            <label htmlFor='note'>Note</label>
            <input
              name='note'
              type='text'
              placeholder='Enter comment...'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>

          <label htmlFor='date'>Date</label>
          <input
            name='date'
            type='text'
            pattern='([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))'
            title='(YYYY-MM-DD)'
            placeholder='YYYY-MM-DD'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label htmlFor='hours'>Hours</label>
          <input
            name='hours'
            type='number'
            placeholder='Enter hours...'
            pattern='^[0-9]*$'
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );

}

export default ReportCreate;
