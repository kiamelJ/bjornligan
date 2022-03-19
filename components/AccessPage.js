import Login from './Login/Login'
import Logout from './Login/Logout'



const AccessPage = ({type}) => {
    
    if(type == "Login")
    {
        return (
        <Login />
        );
    }
    if(type == "Logout")
    {
        return(
            <Logout />
        )
    }

    return(
        <>Här blev det fel</>
    )
    
  };
  
  export default AccessPage;
  