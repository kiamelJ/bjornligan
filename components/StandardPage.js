import NavBar from './UI/NavBar'
import ProjectPage from './Projects/ProjectPage'
import ReportPage from './Reports/ReportPage'
import UserPage from './UserPage/UserPage'
import CreateReport from './Reports/CreateReport'
import { getCookie } from 'cookies-next'
import Link from 'next/link'

import { useState, useEffect, useRef } from 'react'



const StandardPage = ({ type }) => {
    const [time, setTime] = useState(0);
    const [showAlert, setShowAlert] = useState(true);

    useInterval(() => {
        console.log("testa kaka")
        fetch("../api/login/checkcookietime", {
            method: "POST",
            headers: {
                "Content-Type": "plain/text",
            },
            body: getCookie("token"),
            })
            .then((res) => res.json())
            .then(res => setTime(res.timeleft))
            //.then(console.log(time))
    }, 1000 * 3);


    if(type == "Project")
    {
        return (
            <>
            <NavBar expiration={time}/>
            <ProjectPage />
            </>
        )
    }
    
    if(type == "Report")
    {
        return (
            <>
            <NavBar />
            <ReportPage />
            </>
        )
    }
    if(type == "UserPage")
    {
        return(
            <>
            <NavBar />
            <UserPage />
            </>

        )
    }
    if(type == "CreateReport")
    {
        return(
            <>
            <NavBar />
            <CreateReport />
            </>
        )
    }
    
    return(
        <>
        <h1>Inga kakor</h1>
        <Link href='../'>Klicka här för att gå till login</Link>
        </>
    )
    
  };
  
  export default StandardPage;  

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }