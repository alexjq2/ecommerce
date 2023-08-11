import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../style/navStyle.css"
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useDispatch } from 'react-redux';
import { getPurchaseThunk } from '../store/slices/purchaseGet.slice';


const AppNav = () => {
  const dispatch = useDispatch()
  const purchaseGo = () => {
    dispatch(getPurchaseThunk())
  }

  
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className='navBar' >
        <Container>
          <Navbar.Brand as={Link} to="/">Astore</Navbar.Brand>
          <Nav >
            <Nav.Link as={Link} to="/Login"><i className="fa-solid fa-user fa-xl"></i></Nav.Link>
            <Nav.Link as={Link} to="/Purchases" onClick={()=> purchaseGo()}><i className="fa-solid fa-box fa-xl"></i></Nav.Link>
            <Nav.Link >
                <SideBar/>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNav;