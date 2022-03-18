import { getCookies, removeCookies } from 'cookies-next'



const Logout = ({project}) => {
    removeCookies("User");
    removeCookies("UserID");
    removeCookies("projectID");
    removeCookies("Username");

    return(
        <h1>Du har nu loggat ut.</h1>
    )
}

export default Logout
