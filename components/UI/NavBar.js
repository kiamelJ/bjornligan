import navStyles from '../../styles/NavBar.module.css'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className={navStyles.nav}>
        <ul>
            <li>
                <Link href='/userpage'>Hem</Link>
            </li>
            <li>
                <Link href='/projects'>Projekt</Link>
            </li>
            <li>
                <Link href='/reports'>Rapporter</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar