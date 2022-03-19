import NavBar from './UI/NavBar'
import ProjectPage from './Projects/ProjectPage'
import ReportPage from './Reports/ReportPage'
import UserPage from './UserPage/UserPage'
import CreateReport from './Reports/CreateReport'
import { checkCookies } from 'cookies-next'
import Link from 'next/link'


const StandardPage = ({ type }) => {

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
    
    return(
        <>
        <h1>Inga kakor</h1>
        <Link href='../'>Klicka här för att gå till login</Link>
        </>
    )
    
  };
  
  export default StandardPage;  