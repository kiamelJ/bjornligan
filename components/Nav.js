import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/project">
            <a className={currentRoute === "/project" ? "active" : ""}>
              Projects
            </a>
          </Link>
        </li>
        <li>
          <Link href="/timereport/reportsummary">
              <a className={currentRoute === "/timereport/project" ? "active" : ""}>
                Report Summary
              </a>
            </Link>
        </li>
        <li>
          <Link href="/project/projectsummary">
              <a className={currentRoute === "/project/projectsummary" ? "active" : ""}>
                Project Summary
              </a>
            </Link>
        </li>
        <li className={navStyles.rightMargin}>
          <Link href="/userpage">
            <a className={currentRoute === "/userpage" ? "active" : ""}>
              Profile
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">Log out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
