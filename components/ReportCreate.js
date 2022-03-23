import React from "react";
import { getCookie, getCookies } from "cookies-next";
import { useEffect, useState } from "react";
import styles from '../styles/Temp.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

/** props person-ID och project-ID
 * Namn?
 * */

const ReportCreate = () => {
    const [data, setData] = useState({
      note: "",
      date: new Date(),
      hour: 0,
      person: getCookie("User"),
      project: getCookie("Project.Id")
    });

    
    
    async function submitReport(event){
      event.preventDefault();
      
      console.log("input: ", data);

      await fetch("../api/timereport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
              value={data.note}
              onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
              required
            />
          </div>

          <label htmlFor='date'>Date</label>
          <DatePicker
           dateFormat="yyyy-MM-dd"           
           selected={data.date}
                     
          //  onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
          // onChange={(date) => setData(date)}
          onChange={(e) => setData({...data, date: e})}
          
          />
          {
          
          /* <input
            name='date'
            type='text'
            pattern='([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))'
            title='(YYYY-MM-DD)'
            placeholder='YYYY-MM-DD'
            value={data.date}
            onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
            required
          /> */}

          <label htmlFor='hour'>Hours</label>
          <input
            name='hour'
            type='number'
            placeholder='Enter hours...'
            pattern='^[0-9]*$'
            value={data.hours}
            onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
            required
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );

}

export default ReportCreate;
