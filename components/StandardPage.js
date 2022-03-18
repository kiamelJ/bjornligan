import NavBar from './UI/NavBar'
import ProjectPage from './Projects/ProjectPage'
import ReportPage from './Reports/ReportPage'
import UserPage from './UserPage/UserPage'


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

    return(
        <h1>inget</h1>
    )
    
    
  };
  
  export default StandardPage;  