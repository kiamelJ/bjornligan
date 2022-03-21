import NavBar from '../components/UI/NavBar'
import ProjectPage from '../components/Projects/ProjectPage'
import ReportPage from '../components/Reports/ReportPage'
import UserPage from '../components/UserPage/UserPage'
import CreateReport from '../components/Reports/CreateReport'
import Login from '../components/Login/Login'
import Logout from '../components/Login/Logout'






import "../styles/globals.css";
import "../styles/styles.css"

import { Router, Route } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
  // <Router>
  //   <Route path="login" element={<Login />} />

  //   <Route element={<NavBar />}>
  //     <Route path="projectpage" element={<ProjectPage />} />
  //   </Route>


  //   <Route path="*" element={<h1>ingen sida</h1>} />



  // </Router>




  return <Component {...pageProps} />;
}

export default MyApp;
