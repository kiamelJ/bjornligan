import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
        <ul>
            <li>
                <Link href='/'>Hem</Link>
            </li>
            <li>
                <Link href='/project'>Projekt</Link>
            </li>
            <li>
                <Link href='/project'>Rapporter</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav