import navStyles from '../../styles/NavBar.module.css'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import{ useState, useEffect } from 'react'

const NavBar = ({expiration}) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiration));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(expiration));
        }, 1000);
        console.log();
        return () => clearTimeout(timer);
    });

  return (
    <nav className={navStyles.nav}>
        <leftsideblock>
        <ul>
            <li>
                <Link href='/projects'>Projekt</Link>
            </li>
            <li>
                <Link href='/reports'>Rapporter</Link>
            </li>
        </ul>
        </leftsideblock>

        <rightsideblock>
            <ul>
                <li>
                    Countdown: {Math.trunc(timeLeft)}
                </li>
                <li>
                    <Link href='/userpage'>namn</Link>
                </li>
                <li>
                    <Link href='/logout'>Logga out</Link>
                </li>
            </ul>
        </rightsideblock>

    </nav>
  )
}

export default NavBar

const calculateTimeLeft = (expiration) => {
    let timeNow = new Date() / 1000;
    let difference = expiration - timeNow;

    let timeLeft = {}

    if(difference < 0)
    {
        return 0;
    }

    //if(difference > 0)
    // {
    //     timeLeft = {
    //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //         minutes: Math.floor((difference / 1000 / 60) % 60),
    //         seconds: Math.floor((difference / 1000) % 60)
    //     };
    
    //}
    console.log("exp: ", expiration, "difference: ", difference, "timeleft: ", timeLeft);
    return difference;


}