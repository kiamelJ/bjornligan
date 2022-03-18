import React from "react";
import { checkCookies, getCookie } from "cookies-next";
import { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import router from 'next/router'

import styles from '../../styles/Temp.module.css'

const CreateReport = ({project}) => {
    const[note, setNote] = useState();
    const[hour, setHour] = useState();
    const[currentProject, setProject] = useState(getCookie("projectID"));
    const[person, setPerson] = useState(getCookie("UserID"));
    const [isLoading, setLoading] = useState(false);
    const [date, onChange] = useState(new Date());

    const MakeReport = async (event) =>{
        event.preventDefault();
        await fetch("../api/timereport", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([note, hour, currentProject, date, person]),
          })

          
        router.push("../reports");
    }

    function handleProjectChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        setProject(value);
      }

      
      function handleHourChange(event) {
        const target = event.target;
        const value = target.value;
    
        setHour(value);
      }

      function handleNoteChange(event) {
        const target = event.target;
        const value = target.value;
    
        setNote(value);
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
                    onChange={handleNoteChange}
                    value={note}
                    required
                  />
                </div>
      
                <label htmlFor='date'>Date</label>
                <div><Calendar onChange={onChange} maxDate = {new Date()} value={date} /></div>
            
      
                <label htmlFor='hours'>Hours</label>
                <input
                  name='hours'
                  type='number'
                  placeholder='Enter hours...'
                  pattern='^[0-9]*$'
                  onChange={handleHourChange}
                  value={hour}
                  required
                />
                <label htmlFor='project'>Project</label>
                <input
                name='project'
                type='text'
                placeholder='Select project...'
                onChange={handleProjectChange}
                value={currentProject}
                required
                />
                <button type='submit'>Submit</button>
                </form>
                

            </div>
    )


}

export default CreateReport;

