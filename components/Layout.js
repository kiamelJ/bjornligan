import Nav from "./Nav";
import Footer from "./Footer";


const Layout = ({ children }) => {
  return (
    <>      
      <Nav />
      <div>
        <main>{children}</main>      
      </div>          
      <Footer />
    </>
  );
};

export default Layout;
