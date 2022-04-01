import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'

const Nav = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/project">
            <a className={currentRoute === "/project" ? "active" : "inActive"}>
              Projects
            </a>
          </Link>
        </li>
        <li>
          <Link href="/timereport/reportsummary">
              <a className={currentRoute === "/timereport/reportsummary" ? "active" : "inActive"}>
                Report Summary
              </a>
            </Link>
        </li>
        <li>
          <Link href="/project/projectsummary">
              <a className={currentRoute === "/project/projectsummary" ? "active" : "inActive"}>
                Project Summary
              </a>
            </Link>
        </li>
        <li>
          <Link href="/userpage">
            <a className={currentRoute === "/userpage" ? "active" : "inActive"}>
              Profile
            </a>
          </Link>
        </li>
        <li className={navStyles.userName}>
          {getCookie("Name")}
        </li>
        <li>
          <a className='inActive'>
          <Link href="/">Log out</Link>
          </a>     
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
