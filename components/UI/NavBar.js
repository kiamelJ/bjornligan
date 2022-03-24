import navStyles from '../../styles/NavBar.module.css'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'


const NavBar = ({time}) => {
    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(time));
    // const [time, setTime] = useState(0);

    // const router = useRouter();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setTimeLeft(calculateTimeLeft(time));
    //     }, 1000);
    //     console.log();
    //     return () => clearTimeout(timer);
    // });

    // useInterval(() => {
    //     console.log("testa kaka")
    //     fetch("../api/login/checkcookietime")
    //     .then((response) => {
    //         if (response.ok) { 
    //          return response.json();
    //         }
    //         return Promise.reject(response); 
    //       })
    //       .then((result) => { 
    //         console.log(result);
    //       })
    //       .catch((error) => {
    //         console.log('Something went wrong.', error);
    //         router.push('/');
    //       });
    // }, 1000 * 5);

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
                    {/* //Countdown: {Math.trunc(timeLeft)} sekunder */}
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

// const calculateTimeLeft = (expiration) => {
//     let timeNow = new Date() / 1000;
//     let difference = expiration - timeNow;

//     if(difference < 0)
//     {
//         return 0;
//     }
//     //if(difference > 0)
//     // {
//     //     timeLeft = {
//     //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//     //         minutes: Math.floor((difference / 1000 / 60) % 60),
//     //         seconds: Math.floor((difference / 1000) % 60)
//     //     };
    
//     //}
//     //console.log("exp: ", expiration, "difference: ", difference, "timeleft: ", timeLeft);
//     return difference;


// }

// function useInterval(callback, delay) {
//     const savedCallback = useRef();
  
//     // Remember the latest callback.
//     useEffect(() => {
//       savedCallback.current = callback;
//     }, [callback]);
  
//     // Set up the interval.
//     useEffect(() => {
//       function tick() {
//         savedCallback.current();
//       }
//       if (delay !== null) {
//         let id = setInterval(tick, delay);
//         return () => clearInterval(id);
//       }
//     }, [delay]);
//   }