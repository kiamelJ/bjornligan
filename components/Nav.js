import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
        <ul>           
            <li>
                <Link href='/project'>Projekt</Link>
            </li>           
            <li className={navStyles.rightMargin}>
                <Link href='/userpage'>Min sida</Link>
            </li>
            <li>                
                <Link href='/'>Logga ut</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav