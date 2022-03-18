import UserCards from './Login/UserCards'
import Logout from './Login/Logout'



const AccessPage = ({type}) => {
    
    if(type == "Login")
    {
        return (
        <UserCards />
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
  