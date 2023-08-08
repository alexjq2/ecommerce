import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../style/navStyle.css"
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
const AppNav = () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" style={{marginBottom: 35}}>
        <Container>
          <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Login"><i className="fa-regular fa-user fa-xl"></i></Nav.Link>
            <Nav.Link as={Link} to="/Purchases"><i className="fa-solid fa-box fa-xl"></i></Nav.Link>
            <Nav.Link>
                <SideBar/>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNav;