import navStyles from '../../styles/NavBar.module.css'
import Link from 'next/link'
import { getCookie } from 'cookies-next'

const NavBar = () => {
    let name = getCookie("Username");
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