import { getCookies, removeCookies } from 'cookies-next'



const Logout = ({project}) => {
    
        fetch("../api/login/logout", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        })

    return(
        <h1>Du har blivit utloggad.</h1>
    )
}

export default Logout
