import NavBar from './UI/NavBar'
import ProjectPage from './Projects/ProjectPage'
import ReportPage from './Reports/ReportPage'
import UserPage from './UserPage/UserPage'
import CreateReport from './Reports/CreateReport'
import SpecificProject from './Projects/SpecificProject'
import { getCookie } from 'cookies-next'
import Link from 'next/link'

import { useState, useEffect, useRef } from 'react'


const StandardPage = ({ type }) => {
    const [showAlert, setShowAlert] = useState(true);
    


    if(type == "Project")
    {
        return (
            <>
            <NavBar />
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
    if(type == "SpecificProject")
    {
        return(
            <>
            <NavBar />
            <SpecificProject />
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

 