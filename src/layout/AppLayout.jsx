import { useLocation } from "react-router-dom";
import Footer from "../component/common/footer/Footer";
import TopNavbar from "../component/common/navbar/Navbar";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import "./AppLayout.scss";
import BreadCrumbs from "./BreadCrumbs";

const AppLayout = ({ children }) => {
  const location = useLocation();

  return (
    <section>
      <TopNavbar />
      {location.pathname !== "/home" && (
        <Container className="main-component-builder">
          <BreadCrumbs />
          {children}
        </Container>
      )}
      {location.pathname === "/home" && (
        <Container className="main-component-builder">
          {children}
        </Container>
      )}
      <Footer />
    </section>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
