import React from "react";
import { checkCookies, getCookie } from "cookies-next";
import { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import router from 'next/router'
import dayjs from 'dayjs'

import styles from '../../styles/Temp.module.css'

const CreateReport = ({project}) => {
    const[note, setNote] = useState();
    const[hour, setHour] = useState();
    const[currentProject, setProject] = useState(getCookie("projectID"));
    const [isLoading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());

    const locale = 'sv';

    const MakeReport = async (event) =>{
        event.preventDefault();

        const newDate = new Intl.DateTimeFormat('sv-SV').format(date);
        
        await fetch("../api/reports", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([note, hour, currentProject, newDate, getCookie("token")]),
          })

          
        router.push("../reports");
    }

    



    return(
            <div className={styles.container}>
              <form className={styles.form} onSubmit={MakeReport}>
                <div className={styles.inputs}>
                  <label htmlFor='note'>Note</label>
                  <input
                    name='note'
                    type='text'
                    placeholder='Enter comment...'
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    required
                  />
                </div>
      
                <label htmlFor='date'>Date</label>
                <div><Calendar onChange={setDate} maxDate = {new Date()} value={date} /></div>
            
      
                <label htmlFor='hours'>Hours</label>
                <input
                  name='hours'
                  type='number'
                  placeholder='Enter hours...'
                  pattern='^[0-9]*$'
                  onChange={(e) => setHour(e.target.value)}
                  value={hour}
                  required
                />
                <label htmlFor='project'>Project</label>
                <input
                name='project'
                type='text'
                placeholder='Select project...'
                onChange={(e) => setProject(e.target.value)}
                value={currentProject}
                required
                />
                <button type='submit'>Submit</button>
                </form>
                

            </div>
    )


}

export default CreateReport;

