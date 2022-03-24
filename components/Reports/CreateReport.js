import React from "react";
import { checkCookies, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import router from 'next/router'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import parseISO from 'date-fns/parseISO'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from '../../styles/Temp.module.css'

const CreateReport = () => {
    const[note, setNote] = useState();
    const[hour, setHour] = useState();
    const[currentProject, setCurrentProject] = useState();
    const [isLoading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());

    const[allProjects, setAllProjects] = useState();

    const {query} = useRouter();
    

    useEffect(async () => {
      setLoading(true);
      await fetch("../api/project/userprojects")
      .then((res) => res.json())
        .then((data) => {
          setAllProjects(data);
          setLoading(false);
        })
    }, []);

   

    const MakeReport = async (event) =>{
        event.preventDefault();
        console.log(currentProject);

        const newDate = new Intl.DateTimeFormat('sv-SV').format(date);
        
        await fetch("../api/reports", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([note, hour, currentProject.id, newDate]),
          })
          
        router.push("../reports");
    }

      
    if (isLoading) return <p>Loading...</p>;
    if (!allProjects) return <p>No profile data</p>;
    if(allProjects.msg == "bad cookie"){ router.push('/logout'); return(<></>) }
    if(!currentProject && !isLoading && allProjects)
    {
      console.log("inget projekt")
      for(let i = 0; i < allProjects.length; i++)
      {
        console.log(1)
        if(allProjects[i].id == query.id)
        {
          console.log("hittat projekt")
          setCurrentProject(allProjects[i]);
          break;
        }
      }
    }
    
    if(currentProject && !isLoading && allProjects)
    {
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
            <DatePicker
            dateFormat='yyyy-MM-dd'
            selected={date}
            onChange={(date) => setDate(date)}
            maxDate={parseISO(currentProject.properties.Timespan.date.end)}
            minDate={parseISO(currentProject.properties.Timespan.date.start)}
            required
            />
  
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
            {/* <label htmlFor='project'>Project</label>
            <input
            name='project'
            type='text'
            placeholder='Select project...'
            onChange={(e) => setProject(e.target.value)}
            value={currentProject}
            required
      />*/}
            
              <select selected={currentProject.properties.Projectname.title[0].plain_text} onChange={e => setCurrentProject(JSON.parse(e.currentTarget.value))}>
              <option selected disabled hidden>{currentProject.properties.Projectname.title[0].plain_text}</option>
              {allProjects.map((project) => (
                <option key={project.id} value={JSON.stringify(project)}>
                  {project.properties.Projectname.title[0].plain_text}
                </option>
              ))}
        </select>
                    
            <button type='submit'>Submit</button>
        </form>
        </div>
)
    }

    return(<p>skit ner dig</p>)
    
    


}

export default CreateReport;

