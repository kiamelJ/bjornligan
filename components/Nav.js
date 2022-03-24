import navStyles from "../styles/Nav.module.css";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/project">Projects</Link>
        </li>
        <li>
          <Link href="/userpage">Profile</Link>
        </li>
        <li className={navStyles.rightMargin}>
          <Link href="/timereport/reportsummary">Report Summary</Link>
        </li>
        <li>
          <Link href="/">Log out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
