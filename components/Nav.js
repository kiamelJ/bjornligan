import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
        <ul>
            <li>
                {/*TODO: Fixa */}
                <Link href='/'>Logga ut</Link>
            </li>
            <li>
                <Link href='/project'>Projekt</Link>
            </li>
            <li>
                <Link href='/timereport'>Rapporter</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav