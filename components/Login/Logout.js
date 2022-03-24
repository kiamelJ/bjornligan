import { getCookies, removeCookies } from 'cookies-next'
import Link from 'next/link'


const Logout = ({project}) => {
    
        fetch("../api/login/logout", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        })

    return(
        <>
        <h1>Du har blivit utloggad.</h1><br/>
        <Link href='/'>Klicka här för att gå tillbaka</Link>
        
        </>

    )
}

export default Logout
