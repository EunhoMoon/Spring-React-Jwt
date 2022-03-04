import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ isLogin }) => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        <Nav className="me-auto">
          {isLogin ? (
            <Link
              className="nav-link"
              to="/"
              onClick={() => {
                sessionStorage.clear();
                window.location.replace("/");
              }}
            >
              Logout
            </Link>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
          {isLogin ? (
            <Link className="nav-link" to="/user/myInfo">
              My Info
            </Link>
          ) : null}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
